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
from app.services.auth import create_access_token, ForgotPasswordRequestOtpRequest,ForgotPasswordVerifyOtpRequest,ForgotPasswordResetRequest

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

@router.post("/forgot-password/reset-password")
@limiter.limit(settings.RATE_LIMIT_AUTH)
def reset_forgot_password(
    request: Request,
    payload: ForgotPasswordResetRequest | None = Body(default=None),
    db: Session = Depends(get_db),
):
    if payload is None or not payload.new_password or not payload.confirm_password:
        return JSONResponse(
            status_code=400,
            content={
                "success": False,
                "error": "New password and confirm password are required.",
            },
        )

    if payload.new_password != payload.confirm_password:
        return JSONResponse(
            status_code=400,
            content={"success": False, "error": "Passwords do not match."},
        )

    # Core logic placeholder: verify verified-OTP session/token/email, hash & update password, invalidate OTP
    updated = reset_password_with_verified_otp(
        db=db,
        new_password=payload.new_password,
    )
    if not updated:
        return JSONResponse(
            status_code=400,
            content={
                "success": False,
                "error": "Unable to reset password. Please verify your OTP again.",
            },
        )

    return {
        "success": True,
        "message": "Password updated successfully",
    }

@router.get("/me")
def me(user: User = Depends(get_current_user)):
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
    }

@router.post("/forgot-password/request-otp")
@limiter.limit(settings.RATE_LIMIT_AUTH)
def request_forgot_password_otp(
    request: Request,
    payload: ForgotPasswordRequestOtpRequest | None = Body(default=None),
    db: Session = Depends(get_db),
):
    if payload is None or not payload.email:
        return JSONResponse(
            status_code=400,
            content={"success": False, "error": "Email is required."},
        )

    email = payload.email.strip().lower()

    if not email.endswith("@rajalakshmi.edu.in"):
        return JSONResponse(
            status_code=403,
            content={
                "success": False,
                "error": "Please use your official @rajalakshmi.edu.in email.",
            },
        )

    # Core logic placeholder: check user existence, generate/store OTP, and call your email sender
    sent = send_otp_email(email=email)
    if not sent:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": "Failed to send OTP."},
        )

    return {
        "success": True,
        "message": "OTP sent successfully",
    }

@router.post("/forgot-password/verify-otp")
@limiter.limit(settings.RATE_LIMIT_AUTH)
def verify_forgot_password_otp(
    request: Request,
    payload: ForgotPasswordVerifyOtpRequest | None = Body(default=None),
    db: Session = Depends(get_db),
):
    if payload is None or not payload.email or not payload.otp:
        return JSONResponse(
            status_code=400,
            content={"success": False, "error": "Email and OTP are required."},
        )

    email = payload.email.strip().lower()
    otp = payload.otp.strip()

    if not email.endswith("@rajalakshmi.edu.in"):
        return JSONResponse(
            status_code=403,
            content={
                "success": False,
                "error": "Please use your official @rajalakshmi.edu.in email.",
            },
        )

    # Core logic placeholder: validate stored OTP, expiry, and attempt limits
    is_valid = verify_otp(email=email, otp=otp)
    if not is_valid:
        return JSONResponse(
            status_code=400,
            content={"success": False, "error": "Invalid or expired OTP."},
        )

    return {"success": True}



@router.post("/logout")
@limiter.limit(settings.RATE_LIMIT_AUTH)
def logout(request: Request, response: Response):
    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=not settings.DEBUG,
        samesite="lax",
        path="/",
    )
    return {"message": "Logout successful."}