# 定义 user 模型
from models.base import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, BigInteger, CheckConstraint

class User(Base):
    # 模型对应的数据库表名为 "users"
    __tablename__ = "users"

    # 用户角色必须是 'admin' 或 'member'
    __table_args__ = (
        CheckConstraint("role IN ('admin', 'member')", name="check_user_role"),
    )
    
    user_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    username: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    role: Mapped[str] = mapped_column(String(20), nullable=False)