# 用户相关的 Pydantic 模型定义
from pydantic import BaseModel, Field
from pydantic import ConfigDict

# 用户注册请求模型
class UserCreate(BaseModel):
    username: str = Field(max_length=50)
    name: str = Field(max_length=100)
    password: str = Field(min_length=8, max_length=255)

# 用户登录请求模型
class UserLogin(BaseModel):
    username: str = Field(max_length=50)
    password: str = Field(min_length=8, max_length=255)

# 用户基础信息响应模型
class UserInfoResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    user_id: int
    username: str = Field(max_length=50)
    name: str = Field(max_length=100)
    role: str = Field(max_length=20)

# 登录成功响应模型：用户信息 + JWT
class LoginResponse(BaseModel):
    access_token: str
    user: UserInfoResponse
