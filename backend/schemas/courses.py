# 课程 courses 请求相关的 schema
from pydantic import BaseModel, Field
from pydantic import ConfigDict
from typing import Optional, Literal    
from datetime import datetime
# 添加课程请求的 schema
class CourseBaseInfo(BaseModel):
    course_title: str = Field(max_length=100)
    description: Optional[str] = None
    start_time: datetime
    duration: int = Field(gt=0)
    capacity: int = Field(gt=0)
    status: Literal["scheduled", "completed", "cancelled"]

# 课程基础信息响应模型
class CourseInfoResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    course_id: int
    course_title: str = Field(max_length=100)
    description: Optional[str] = None
    start_time: datetime
    duration: int = Field(gt=0)
    capacity: int = Field(gt=0)
    status: Literal["scheduled", "completed", "cancelled"]

# 搜索课程响应的 schema
class CourseSearchResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    course_id: int
    course_title: str = Field(max_length=100)
    status: Literal["scheduled", "completed", "cancelled"]
    start_time: datetime

# dashboard 课程的响应 schema
class CourseDashboardResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    course_id: int
    course_title: str = Field(max_length=100)
    start_time: datetime

