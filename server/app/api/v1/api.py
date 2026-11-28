from fastapi import APIRouter

from app.api.v1.endpoints import auth, health,student_dashboard, mentor_dashboard,notification

api_router = APIRouter()

api_router.include_router(
    health.router,
    tags=["health"],
)

api_router.include_router(auth.router,tags=["auth"])
api_router.include_router(student_dashboard.router,tags=["student"])
api_router.include_router(mentor_dashboard.router,tags=["mentor"])
api_router.include_router(notification.router,tags=["notification"])