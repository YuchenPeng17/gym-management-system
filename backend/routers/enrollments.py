# 与报名相关的路由
from fastapi import APIRouter, Depends, HTTPException
from utils.security import get_current_user, get_current_admin
from utils.response import success_response
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from config.db_conf import get_database
from crud import courses as crud_courses
from crud import enrollments as crud_enrollments
from crud import users as crud_users
from schemas.enrollments import AdminEnrollUserRequest



router = APIRouter(prefix="/api/enrollments", tags=["enrollments"])

# 查看所有报名
@router.get("/list")
async def list_enrollments(
    current_admin=Depends(get_current_admin),
    db: AsyncSession = Depends(get_database),
):
    enrollments = await crud_enrollments.get_all_enrollments(db)
    return success_response(status_code=200, message="获取报名列表成功", data=enrollments)

# 用户操作下的报名
@router.post("/enroll/{course_id}")
async def enroll_user(course_id: int, current_user = Depends(get_current_user), db: AsyncSession = Depends(get_database)):
    # 当前用户、课程 id、db
    # 检查课程是否存在
    course = await crud_courses.get_course_by_id(db, course_id)
    if course is None:
        raise HTTPException(status_code=404, detail="课程不存在")
    # 检查课程是否可以报名
    course_availability = await crud_courses.is_course_enrollable(db, course)
    if not course_availability:
        raise HTTPException(status_code=400, detail="课程已不可报名")
    # 检查是否已经报过名
    is_user_enrolled = await crud_enrollments.is_user_enrolled(db, current_user.user_id, course_id)
    if is_user_enrolled:
        # 检查是不是取消报名了
        enrollment_record = await crud_enrollments.get_enrollment_by_course_and_user(db, course_id, current_user.user_id)
        if enrollment_record.status == "cancelled":
            # 如果之前取消过报名，允许重新报名
            await crud_enrollments.update_enrollment(db, enrollment_record.enrollment_id)
            return success_response(status_code=200, message="会员重新报名成功")
        raise HTTPException(status_code=400, detail="用户已报名该课程")
    # 创建报名
    await crud_enrollments.create_enrollment(db, current_user.user_id, course_id)

    return success_response(status_code=200, message="会员报名成功")

# 管理员操作下的帮用户报名
@router.post("/admin/enroll")
async def admin_enroll_user(request: AdminEnrollUserRequest, current_admin=Depends(get_current_admin), db: AsyncSession = Depends(get_database)):
    user = await crud_users.get_user_by_id(db, request.user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="用户不存在")
    course = await crud_courses.get_course_by_id(db, request.course_id)
    if course is None:
        raise HTTPException(status_code=404, detail="课程不存在")
    course_availability = await crud_courses.is_course_enrollable(db, course)
    if not course_availability:
        raise HTTPException(status_code=400, detail="课程已不可报名")
    is_user_enrolled = await crud_enrollments.is_user_enrolled(db, request.user_id, request.course_id)
    if is_user_enrolled:
        raise HTTPException(status_code=400, detail="用户已报名该课程")
    await crud_enrollments.create_enrollment(db, request.user_id, request.course_id)
    return success_response(status_code=200, message="管理员帮用户报名成功")


# 管理员更新用户报名
@router.patch('/update/{enrollment_id}')
async def update_enrollment_status(enrollment_id: int, current_admin=Depends(get_current_admin), db: AsyncSession = Depends(get_database)):
    # 检查是否有这个enrollment
    enrollment = await crud_enrollments.get_enrollment_by_id(db, enrollment_id)
    if enrollment is None:
        raise HTTPException(status_code=404, detail="报名不存在")
    result =  await crud_enrollments.update_enrollment(db, enrollment_id)
    if result is None:
        raise HTTPException(status_code=400, detail="课程已经无法报名")
    return success_response(status_code=200, message="更新报名状态成功")

# 用户更新报名
@router.patch('/update/member/{course_id}')
async def update_user_enrollment(course_id: int, current_user=Depends(get_current_user), db: AsyncSession = Depends(get_database)):
    enrollment = await crud_enrollments.get_enrollment_by_course_and_user(db, course_id, current_user.user_id)
    if enrollment is None:
        raise HTTPException(status_code=404, detail="报名不存在")
    result = await crud_enrollments.update_enrollment(db, enrollment.enrollment_id)
    if result is None:
        raise HTTPException(status_code=400, detail="课程已经无法报名")
    return success_response(status_code=200, message="更新报名状态成功")

# 用户报名列表
@router.get('/member/my-enrollments')
async def get_my_enrollments(current_user=Depends(get_current_user), db: AsyncSession = Depends(get_database)):
    enrollments = await crud_enrollments.get_enrollments_by_user(db, current_user.user_id)
    return success_response(status_code=200, message="获取用户报名列表成功", data=enrollments)  
