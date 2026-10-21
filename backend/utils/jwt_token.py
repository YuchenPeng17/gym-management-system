import os
from dotenv import load_dotenv
from pathlib import Path
from datetime import datetime, timezone, timedelta
import jwt
BASE_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = BASE_DIR / ".env"
load_dotenv(ENV_PATH)

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", 30))

def create_access_token(user_id: int) -> str:
    # token 过期时间
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=JWT_EXPIRE_MINUTES
    )
    # sub 存用户唯一标识，用于后续解码鉴权
    payload = {
        "sub": str(user_id),
        "exp": expire,
    }
    # 用密钥签名生成 JWT
    token = jwt.encode(
        payload,
        JWT_SECRET_KEY,
        algorithm=JWT_ALGORITHM
    )
    return token

def decode_access_token(token: str):
    return jwt.decode(
        token,
        JWT_SECRET_KEY,
        algorithms=[JWT_ALGORITHM]
    )
