# 业务代码抛异常，再由全局 Exception Handler 统一处理
# 全局处理 HTTPException 业务异常、pydantic 参数验证异常、sqlalchemy 数据库约束异常、其他未捕获异常

from fastapi import FastAPI, Request, HTTPException
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import IntegrityError
from fastapi.responses import JSONResponse


# 请求和异常对象的说明:
# request (Request): 当前的 HTTP 请求对象。
# exc (Exception): 捕获到的异常对象。

async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "message": exc.detail,
            "data": None,
        },
    ) 

async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "message": "Request validation failed",
            "data": exc.errors(),
        },
    )

async def integrity_error_handler(request: Request, exc: IntegrityError):
    return JSONResponse(
        status_code=409,
        content={
            "message": "Database integrity error or constraint conflict",
            "data": None,
        },
    )   

async def general_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "message": "Internal server error",
            "data": None,
        },
    )

def register_exception_handlers(app: FastAPI):
    # 将项目统一异常处理器注册到 FastAPI 应用
    app.add_exception_handler(HTTPException, http_exception_handler)
    app.add_exception_handler(IntegrityError, integrity_error_handler)
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(Exception, general_exception_handler)