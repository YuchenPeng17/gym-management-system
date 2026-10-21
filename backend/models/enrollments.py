# 定义 enrollment 模型
from models.base import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, BigInteger, CheckConstraint, UniqueConstraint, ForeignKey

class Enrollment(Base):
    # 模型对应的数据库表名为 "enrollments"
    __tablename__ = "enrollments"

    # enrollment 的状态必须是 'enrolled'、'completed' 或 'cancelled'
    # enrollment 的用户和课程组合必须唯一，用户不可以重复报名同一门课程
    __table_args__ = (
        CheckConstraint("status IN ('enrolled', 'completed', 'cancelled')", name="check_enrollment_status"),
        UniqueConstraint("user_id", "course_id", name="uq_enrollment_user_course"),
    )

    enrollment_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    course_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("courses.course_id", ondelete="CASCADE"), nullable=False)
    status: Mapped[str] = mapped_column(String(50), nullable=False)
