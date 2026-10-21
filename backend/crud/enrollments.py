# 报名相关的 CRUD 操作
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.enrollments import Enrollment
from models.users import User
from models.courses import Course
from crud import courses as crud_courses
from schemas.enrollments import UserEnrollmentsResponse
from schemas.users import UserInfoResponse
from schemas.courses import CourseInfoResponse


# 根据 id 获取报名记录
async def get_enrollment_by_id(db: AsyncSession, enrollment_id: int):
    stmt = select(Enrollment).where(Enrollment.enrollment_id == enrollment_id)
    result = await db.execute(stmt)
    return result.scalar_one_or_none()

# 获取所有报名记录
async def get_all_enrollments(db: AsyncSession):
    stmt = (
        select(Enrollment, User.username, Course.course_title)
        .join(User, Enrollment.user_id == User.user_id)
        .join(Course, Enrollment.course_id == Course.course_id)
        .order_by(Enrollment.enrollment_id)
    )
    result = await db.execute(stmt)
    rows = result.all()
    return [
        {
            "enrollment_id": enrollment.enrollment_id,
            "user_id": enrollment.user_id,
            "username": username,
            "course_id": enrollment.course_id,
            "course_title": course_title,
            "status": enrollment.status,
            "created_at": enrollment.created_at,
            "updated_at": enrollment.updated_at,
        }
        for enrollment, username, course_title in rows
    ]

# 检查用户是否已经报名某课程
async def is_user_enrolled(db: AsyncSession, user_id: int, course_id: int):
    stmt = select(Enrollment).where(Enrollment.user_id == user_id, Enrollment.course_id == course_id)
    result = await db.execute(stmt)
    if result.scalar_one_or_none() is None:
        return False
    return True

# 创建报名
async def create_enrollment(db: AsyncSession, user_id: int, course_id: int):
    new_enrollment = Enrollment(user_id=user_id, course_id=course_id, status="enrolled")
    db.add(new_enrollment)
    await db.commit()
    await db.refresh(new_enrollment)
    return new_enrollment

# 取消报名
async def update_enrollment(db: AsyncSession, enrollment_id: int):
    enrollment = await get_enrollment_by_id(db, enrollment_id)
    if enrollment is None:
        return None
    # 如果 status 是 cancelled，改为 enrolled
    # 如果 status 是 enrolled，改为 cancelled
    if enrollment.status == "cancelled":
        # 检查课程是否还可以报名
        course = await crud_courses.get_course_by_id(db, enrollment.course_id)
        course_availability = await crud_courses.is_course_enrollable(db, course)
        if not course_availability:
            return None
        enrollment.status = "enrolled"
    else:
        enrollment.status = "cancelled"
    db.add(enrollment)
    await db.commit()
    await db.refresh(enrollment)
    return enrollment

# 根据课程和用户获取报名记录
async def get_enrollment_by_course_and_user(db: AsyncSession, course_id: int, user_id: int):
    stmt = select(Enrollment).where(Enrollment.course_id == course_id, Enrollment.user_id == user_id)
    result = await db.execute(stmt)
    return result.scalar_one_or_none()

# 根据用户获取报名记录
async def get_enrollments_by_user(db: AsyncSession, user_id: int):
    stmt = (
        select(Enrollment, User, Course)
        .join(User, Enrollment.user_id == User.user_id)
        .join(Course, Enrollment.course_id == Course.course_id)
        .where(Enrollment.user_id == user_id)
    )
    result = await db.execute(stmt)
    result = [
        UserEnrollmentsResponse(
            enrollment_id=enrollment.enrollment_id,
            user = UserInfoResponse.model_validate(user),
            course = CourseInfoResponse.model_validate(course),
            status = enrollment.status,
        )
        for enrollment, user, course in result.all()
    ]
    return result