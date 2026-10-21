# 成功响应统一封装
from fastapi import status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

def success_response(status_code: int = status.HTTP_200_OK, message="Success", data=None):

    """
    统一封装成功响应，返回标准格式的 JSON 响应。

    Args:
        status_code (int): HTTP 状态码，默认为 200。
        message (str): 响应提示信息，默认为 "Success"。
        data (Any): 响应数据，默认为 None。

    Returns:
        JSONResponse: 包含 code、message 和 data 的 HTTP JSON 响应对象。
    """
    
    content = {
        "message": message,
        "data": data
    }

    # jsonable_encoder(content): 把 content 转换成 JSON 能处理的数据 
    # JSONResponse(...): 把转换后的数据包装成 HTTP JSON Response 返回给前端
    return JSONResponse(status_code=status_code, content=jsonable_encoder(content))