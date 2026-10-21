# users 相关的 CRUD 操作
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import date
from models.users import User
from schemas.users import UserCreate, UserLogin
from utils.security import verify_password
# 根据 username 获取用户
async def get_user_by_username(db: AsyncSession, username: str):
    stmt = select(User).where(User.username == username)
    user = await db.execute(stmt)
    return user.scalar_one_or_none()

# 根据 member name 模糊搜索用户
async def search_users_by_name(db: AsyncSession, name: str):
    stmt = select(User).where(User.name.ilike(f"%{name}%"), User.role == "member")
    result = await db.execute(stmt)
    return result.scalars().all()


# 根据 user_id 获取用户
async def get_user_by_id(db: AsyncSession, user_id: int):
    stmt = select(User).where(User.user_id == user_id)
    user = await db.execute(stmt)
    return user.scalar_one_or_none()

# 创建用户
async def create_user(db: AsyncSession, user_data: UserCreate):
    new_user = User(
        username=user_data.username,
        name=user_data.name,
        password_hash=user_data.password,
        role="member",
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

# 验证用户登录
async def authenticate_user(db: AsyncSession, user_data: UserLogin):
    # 检查用户是否存在
    existing_user = await get_user_by_username(db, user_data.username)
    if not existing_user:
        return None
    # 验证用户密码
    if not verify_password(user_data.password, existing_user.password_hash):
        return None
    return existing_user

# 获取所有用户
async def get_all_users(db: AsyncSession):
    stmt = select(User)
    result = await db.execute(stmt)
    return result.scalars().all()

# 获取用户的会员天数
async def get_membership_days_count(db: AsyncSession, user_id: int) -> int:
    stmt = select(User.created_at).where(User.user_id == user_id)
    result = await db.execute(stmt)
    created_at = result.scalar_one_or_none()
    if created_at is None:
        return 0
    return max(0, (date.today() - created_at.date()).days)