# 定义 course 模型
# courses
# - PK: course_id                     BIGINT, PRIMARY KEY, 
# - course_title                      VARCHAR(100), NOT NULL
# - description                       TEXT, NULLABLE
# - start_time                        TIMESTAMPTZ, NOT NULL
# - duration                          INTEGER, NOT NULL, CHECK FOR (duration > 0)
# - capacity                          INTEGER, NOT NULL, CHECK FOR (capacity > 0)
# - status                            VARCHAR(50), NOT NULL, CHECK FOR (scheduled / completed / cancelled)
# - created_at                        TIMESTAMPTZ, NOT NULL, DEFAULT NOW()
# - updated_at                        TIMESTAMPTZ, NOT NULL, DEFAULT NOW()

from models.base import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, BigInteger, CheckConstraint, Text, Integer, DateTime
from datetime import datetime
from typing import Optional

class Course(Base):
    # 模型对应的数据库表名为 "courses"
    __tablename__ = "courses"

    # 课程状态必须是 'scheduled'、'completed' 或 'cancelled'
    # 课程的持续时间必须大于 0，容量必须大于 0
    __table_args__ = (
        CheckConstraint("status IN ('scheduled', 'completed', 'cancelled')", name="check_course_status"),
        CheckConstraint("duration > 0", name="check_course_duration"),
        CheckConstraint("capacity > 0", name="check_course_capacity"),
    )

    course_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    course_title: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    start_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    duration: Mapped[int] = mapped_column(Integer, nullable=False)
    capacity: Mapped[int] = mapped_column(Integer, nullable=False)
    status: Mapped[str] = mapped_column(String(50), nullable=False)