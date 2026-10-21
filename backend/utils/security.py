# 哈希密码和验证密码的工具函数
from pwdlib import PasswordHash
password_hash = PasswordHash.recommended()
def hash_password(password: str) -> str:
    return password_hash.hash(password)
def verify_password(password: str, hashed_password: str) -> bool:
    return password_hash.verify(password, hashed_password)

# 根据请求 header 中的 JWT Token 获取当前用户信息的依赖函数
from fastapi import Header, HTTPException
from utils.jwt_token import decode_access_token
from crud import users as crud_users
from config.db_conf import get_database
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from models.users import User

async def get_current_user(authorization: str = Header(...), db: AsyncSession = Depends(get_database)):
    # 1. 验证 token 格式
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="无效的授权头")
    # 2. 提取 token
    token = authorization.removeprefix("Bearer ").strip()

    # 3. 通过 jwt 的 helper 函数解码 token 获取用户信息
    try:
        payload = decode_access_token(token)
    except Exception:
        raise HTTPException(status_code=401, detail="无效的 token")

    # 4. 通过当前 payload 获取用户信息
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="无效的 token")

    # 5. 根据 userid 获取用户信息
    user = await crud_users.get_user_by_id(db, int(user_id))
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")
    return user

async def get_current_admin(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="权限不足")
    return current_user