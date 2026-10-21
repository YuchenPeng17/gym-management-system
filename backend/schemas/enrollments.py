# 报名相关的 Pydantic 模型
from pydantic import BaseModel
from typing import Literal
from schemas.users import UserInfoResponse
from schemas.courses import CourseInfoResponse

class EnrollmentRequest(BaseModel):
    user_id: int
    course_id: int
    status: Literal["enrolled", "completed", "cancelled"]

class AdminEnrollUserRequest(BaseModel):
    user_id: int
    course_id: int

# 用户报名列表请求的 schema
class UserEnrollmentsResponse(BaseModel):
    enrollment_id: int
    user: UserInfoResponse
    course: CourseInfoResponse
    status: Literal["enrolled", "completed", "cancelled"]