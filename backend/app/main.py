from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import exercise_router
from .core.config import settings

app = FastAPI()

# CORS设置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(exercise_router.router, prefix="/api") 