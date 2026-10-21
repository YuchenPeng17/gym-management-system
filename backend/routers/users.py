# 用户相关路由模块
from fastapi import APIRouter, Depends, HTTPException, status
from utils.security import get_current_admin
from models.users import User
from sqlalchemy.ext.asyncio import AsyncSession
# config
from config.db_conf import get_database
# utils
from utils.security import hash_password, get_current_user
from utils.response import success_response
from utils.jwt_token import create_access_token
# schemas
from schemas.users import UserCreate, UserInfoResponse, UserLogin, LoginResponse
from schemas.courses import CourseDashboardResponse
# crud
from crud import users as crud_users
from crud import courses as crud_courses

router = APIRouter(prefix="/api/users", tags=["users"])

# 用户注册接口
@router.post("/register")
async def register_user(user_data: UserCreate,db: AsyncSession = Depends(get_database)):
    # 检查用户是否存在 -> 存在：抛出异常；不存在：哈希密码 -> 保存到数据库 -> 签发
    
    # 检查用户是否存在
    existing_user = await crud_users.get_user_by_username(db, user_data.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="用户已存在")

    # 哈希密码后保存用户到数据库
    user_data.password = hash_password(user_data.password)
    user = await crud_users.create_user(db, user_data)
    user = UserInfoResponse.model_validate(user)

    return success_response(status.HTTP_201_CREATED, "用户创建成功", data=user)

# admin 注册接口

# 用户登录接口
@router.post("/login")
async def login_user(user_data: UserLogin, db: AsyncSession = Depends(get_database)):
    # 验证用户
    existing_user = await crud_users.authenticate_user(db, user_data)
    if not existing_user:
        raise HTTPException(status_code=400, detail="用户名或密码错误")
    # 签发 JWT Token
    access_token = create_access_token(existing_user.user_id)
    login_response = LoginResponse(
        access_token=access_token,
        user=UserInfoResponse.model_validate(existing_user),
    )
    return success_response(status.HTTP_200_OK, "登录成功", data=login_response)

# 获取用户基础信息
@router.get("/me")
async def get_current_user_info(current_user=Depends(get_current_user)):
    return success_response(status.HTTP_200_OK, "获取用户信息成功", data=UserInfoResponse.model_validate(current_user))

# 根据 member name 模糊搜索用户
@router.get("/search/{name}")
async def search_users(name: str, current_admin: User = Depends(get_current_admin), db: AsyncSession = Depends(get_database)):
    users = await crud_users.search_users_by_name(db, name)
    users_response = [UserInfoResponse.model_validate(user) for user in users]
    return success_response(status.HTTP_200_OK, "搜索用户成功", data=users_response)

# 获取用户列表
@router.get("/list")
async def list_users(current_admin: User = Depends(get_current_admin), db: AsyncSession = Depends(get_database)):
    users = await crud_users.get_all_users(db)
    users_response = [UserInfoResponse.model_validate(user) for user in users]
    return success_response(status.HTTP_200_OK, "获取用户列表成功", data=users_response)

# 获取用户仪表盘
@router.get("/dashboard-member")
async def get_dashboard_member(current_user=Depends(get_current_user), db: AsyncSession = Depends(get_database)):
    # 1. get 5 upcoming courses
    upcoming_courses = await crud_courses.get_courses_list(db, limit=5, offset=0)
    # 2. get membership days count
    membership_days_count = await crud_users.get_membership_days_count(db, current_user.user_id)
    # 3. get top 5 member enrollled courses
    top_enrolled_courses = await crud_courses.get_upcoming_my_courses_for_user(db, current_user.user_id, limit=5, offset=0)

    dashboard_data = {
        "upcoming_courses": [CourseDashboardResponse.model_validate(course) for course in upcoming_courses],
        "membership_days_count": membership_days_count,
        "top_enrolled_courses": [CourseDashboardResponse.model_validate(course) for course in top_enrolled_courses]
    }

    return success_response(status.HTTP_200_OK, "获取用户仪表盘成功", data=dashboard_data)