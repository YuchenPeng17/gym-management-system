# 课程相关路由模块
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from config.db_conf import get_database
from utils.security import get_current_admin, get_current_user
from models.users import User
from schemas.courses import CourseBaseInfo, CourseSearchResponse
from crud import courses as crud_courses
from utils.response import success_response

router = APIRouter(prefix="/api/courses", tags=["courses"])

# 查看课程路由
@router.get("/list")
# current_user: User = Depends(get_current_user),
async def list_courses(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_database)):
    courses = await crud_courses.get_all_courses(db)
    return success_response(status_code=200, message="获取课程列表成功", data=courses)

# 添加课程路由
@router.post("/add")
async def add_course(course_info: CourseBaseInfo,
                     current_admin: User = Depends(get_current_admin), 
                     db: AsyncSession = Depends(get_database)):
    # 通过依赖注入函数确认用户权限为管理员
    # 获取课程信息
    

    # 通过课程信息与数据库交互，保存课程信息
    course = await crud_courses.create_course(db, course_info)

    # 返回添加课程成功的响应 code，message，data
    return success_response(status_code=200, message="课程创建成功", data=course)

# 更新课程路由
@router.put("/update/{course_id}")
async def update_course(course_id: int,
                        course_info: CourseBaseInfo,
                        current_admin: User = Depends(get_current_admin),
                        db: AsyncSession = Depends(get_database)):
    course = await crud_courses.update_course(db, course_id, course_info)
    if course is None:
        raise HTTPException(status_code=404, detail="课程不存在")
    return success_response(status_code=200, message="课程更新成功", data=course)

# 根据课程名称模糊搜索课程
@router.get("/search/{name}")
async def search_courses(name: str, current_admin: User = Depends(get_current_admin), db: AsyncSession = Depends(get_database)):
    courses = await crud_courses.search_courses_by_name(db, name)
    data = [CourseSearchResponse.model_validate(course) for course in courses]
    return success_response(status_code=200, message="搜索课程成功", data=data)

# 根据用户获取课程
@router.get("/my-courses")
async def get_upcoming_enrolled_courses_for_user(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_database)):
    courses = await crud_courses.get_upcoming_my_courses_for_user(db, current_user.user_id, limit = 5, offset = 0)
    # data = [CourseBaseInfo.model_validate(course) for course in courses]
    return success_response(status_code=200, message="获取用户课程成功", data=courses)
    