# 课程相关的 CRUD 操作
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from models.courses import Course
from models.enrollments import Enrollment
from schemas.courses import CourseBaseInfo

# 获取单个课程的 CRUD 操作
async def get_course_by_id(db: AsyncSession, course_id: int):
    result = await db.execute(select(Course).where(Course.course_id == course_id))
    return result.scalar_one_or_none()


# 获取所有课程的 CRUD 操作
async def get_all_courses(db: AsyncSession):
    stmt = select(Course)
    result = await db.execute(stmt)
    return result.scalars().all()


# 根据 limit 和 offet 返回最新的课程列表
async def get_courses_list(db: AsyncSession, limit: int = 10, offset: int = 0):
    stmt = select(Course).order_by(Course.start_time.desc()).limit(limit).offset(offset)
    result = await db.execute(stmt)
    return result.scalars().all()


# 根据用户返回 enrolled 的最近的课程列表
async def get_upcoming_my_courses_for_user(db: AsyncSession, user_id: int, limit: int = 5, offset: int = 0):
    stmt = select(Course).join(Enrollment).where(
        Enrollment.user_id == user_id,
        # Enrollment.status == "enrolled"
    ).order_by(Course.start_time.desc()).limit(limit).offset(offset)
    result = await db.execute(stmt)
    return result.scalars().all()


# 查看课程当前报名人数
async def get_current_enrollment_count(db: AsyncSession, course: Course):
    stmt = select(func.count()).select_from(Enrollment).where(Enrollment.course_id == course.course_id,
                                                              Enrollment.status == "enrolled"
                                                              )
    result = await db.execute(stmt)
    return result.scalar()

# 查看课程是否允许报名(当前报名人数<课程容量 && 课程状态为 scheduled)
async def is_course_enrollable(db: AsyncSession, course: Course):
    # 查看当前报名人数
    current_enrollment_count = await get_current_enrollment_count(db, course)
    if current_enrollment_count >= course.capacity:
        return False
    if course.status != "scheduled":
        return False
    return True

# 创建课程的 CRUD 操作
async def create_course(db: AsyncSession, course_info: CourseBaseInfo):
    course = Course(
        course_title=course_info.course_title,
        description=course_info.description,
        start_time=course_info.start_time,
        duration=course_info.duration,
        capacity=course_info.capacity,
        status=course_info.status
    )
    db.add(course)
    await db.commit()
    await db.refresh(course)
    return course

# 更新课程的 CRUD 操作
async def update_course(db: AsyncSession, course_id: int, course_info: CourseBaseInfo):
    result = await db.execute(select(Course).where(Course.course_id == course_id))
    course = result.scalar_one_or_none()
    if course is None:
        return None

    course.course_title = course_info.course_title
    course.description = course_info.description
    course.start_time = course_info.start_time
    course.duration = course_info.duration
    course.capacity = course_info.capacity
    course.status = course_info.status

    await db.commit()
    await db.refresh(course)
    return course

async def search_courses_by_name(db: AsyncSession, name: str):
    stmt = select(Course).where(Course.course_title.ilike(f"%{name}%"))
    result = await db.execute(stmt)
    return result.scalars().all()