from fastapi import FastAPI
from utils.exceptions import register_exception_handlers
from fastapi.middleware.cors import CORSMiddleware
from routers import users, courses, enrollments
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_exception_handlers(app)

@app.get("/")
async def root():
    return {
        "message": "Hello FastAPI"
    }

app.include_router(users.router)
app.include_router(courses.router)
app.include_router(enrollments.router)