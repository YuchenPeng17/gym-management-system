# 定义 equipment 模型
# equipment
# - PK: equipment_id                  BIGINT, PRIMARY KEY, 
# - name                              VARCHAR(100), NOT NULL,
# - category                          VARCHAR(100), NOT NULL,
# - status                            VARCHAR(50), NOT NULL, CHECK FOR (available / maintenance / out_of_service)
# - purchase_date                     DATE, NULLABLE
# - created_at                        TIMESTAMPTZ, NOT NULL, DEFAULT NOW(),
# - updated_at                        TIMESTAMPTZ, NOT NULL, DEFAULT NOW(),

from models.base import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, BigInteger, CheckConstraint, Date
from datetime import date
from typing import Optional

class Equipment(Base):
    # 模型对应的数据库表名为 "equipment"
    __tablename__ = "equipment"

    # 设备状态必须是 'available'、'maintenance' 或 'out_of_service'
    __table_args__ = (
        CheckConstraint("status IN ('available', 'maintenance', 'out_of_service')", name="check_equipment_status"),
    )

    equipment_id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    category: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[str] = mapped_column(String(50), nullable=False)
    purchase_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)