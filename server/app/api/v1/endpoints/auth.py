from fastapi import APIRouter, Body, Depends, Request, Response
from fastapi.responses import JSONResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.rate_limiter import limiter
from app.db.session import get_db
from app.models.User import User
from app.dependancies.auth import get_current_user
from app.schemas.login import LoginRequest
from app.services.auth import create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
@limiter.limit(settings.RATE_LIMIT_AUTH)
def login(
    request: Request,
    response: Response,
    payload: LoginRequest | None = Body(default=None),
    db: Session = Depends(get_db),
):
    if payload is None or not payload.email or not payload.password or not payload.role:
        return JSONResponse(
            status_code=400,
            content={"error": "Email, password and role are required."},
        )

    email = payload.email.strip().lower()
    role = payload.role.strip().lower()

    if not email.endswith("@rajalakshmi.edu.in"):
        return JSONResponse(
            status_code=403,
            content={
                "error": "Please use your official @rajalakshmi.edu.in email."
            },
        )

    if role not in {"student", "mentor"}:
        return JSONResponse(
            status_code=400,
            content={"error": "Invalid role."},
        )

    user = db.scalar(select(User).where(User.email == email))
    if (
        user is None
        or user.role.lower() != role
        or not user.check_password(payload.password)
    ):
        return JSONResponse(
            status_code=401,
            content={"error": "Invalid email, password or role."},
        )

    access_token = create_access_token(user.id)
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=not settings.DEBUG,
        samesite="lax",
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        path="/",
    )

    return {
        "message": "Login successful.",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
        },
    }


@router.get("/me")
def me(user: User = Depends(get_current_user)):
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
    }
