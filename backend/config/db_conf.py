# ============================================================
# 1. 读取数据库配置，创建异步 Engine
# ============================================================
import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = BASE_DIR / ".env"

load_dotenv(ENV_PATH)
POSTGRESQL_USERNAME = os.getenv("POSTGRESQL_USERNAME")
POSTGRESQL_PASSWORD = os.getenv("POSTGRESQL_PASSWORD")

ASYNC_DATABASE_URL = f"postgresql+asyncpg://{POSTGRESQL_USERNAME}:{POSTGRESQL_PASSWORD}@localhost:5432/gym_management"
from sqlalchemy.ext.asyncio import create_async_engine

async_engine = create_async_engine(
    ASYNC_DATABASE_URL,
    echo = True,
    pool_size = 10,
    max_overflow = 20
)

# ============================================================
# 2. 创建 AsyncSession 工厂。
#    在一次 HTTP 请求中，我们通常创建一个 Session，用它完成这一整次请求里的数据库操作。
# get_database()：创建 Session、提供给接口、释放 Session。
# CRUD / Service：执行数据库操作，并由约定的事务管理层负责提交。============================================================
from sqlalchemy.ext.asyncio import async_sessionmaker, AsyncSession
AsyncSessionLocal = async_sessionmaker(
    bind = async_engine,
    class_ = AsyncSession,
    expire_on_commit = False
)

# ============================================================
# 3. 创建 FastAPI 数据库依赖
# ============================================================
async def get_database():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
