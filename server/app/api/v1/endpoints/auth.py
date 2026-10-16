from authlib.integrations.starlette_client import OAuth
from authlib.integrations.base_client.errors import OAuthError
from fastapi import APIRouter, Depends, Request, Response, status, HTTPException
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session as DBSession

from app.core.config import settings
from app.db.session import get_db
from app.dependancies.auth import get_current_user_optional, get_current_user
from app.models.user import User
from app.schemas.auth import MeResponse, SessionUser, TokenResponse, CompleteProfileRequest
from app.services.auth import (
    verify_institutional_email,
    get_or_create_user,
    create_access_token,
)

# from app.db.seed import seed_test_data

from slowapi.util import get_remote_address
from app.core.rate_limiter import limiter

router = APIRouter(prefix="/auth", tags=["auth"])

oauth = OAuth()
oauth.register(
    name="google",
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)


@router.get("/google/start")
@limiter.limit(settings.RATE_LIMIT_AUTH, key_func=get_remote_address)
async def google_start(request: Request):
    return await oauth.google.authorize_redirect(request, settings.GOOGLE_REDIRECT_URI, prompt="select_account")


@router.get("/google/callback")
@limiter.limit(settings.RATE_LIMIT_AUTH, key_func=get_remote_address)
async def google_callback(request: Request, db: DBSession = Depends(get_db)):
    try:
        token = await oauth.google.authorize_access_token(request)
    except OAuthError:
        return RedirectResponse(url=f"{settings.FRONTEND_URL}/login-error")

    claims = token.get("userinfo") or await oauth.google.parse_id_token(request, token)

    email = claims["email"]
    email_verified = claims.get("email_verified", False)
    google_sub = claims["sub"]
    name = claims.get("name", email)

    verify_institutional_email(email, email_verified)

    user = get_or_create_user(db, google_sub=google_sub, email=email, name=name)
    access_token = create_access_token(user=user)

    redirect_response = RedirectResponse(
        url=f"{settings.FRONTEND_URL}/auth/callback",
        status_code=status.HTTP_303_SEE_OTHER,
    )

    # Set secure HttpOnly cookie (No access token in URL)
    redirect_response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=not settings.DEBUG,
        samesite="lax",
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        path="/",
    )

    return redirect_response


@router.post("/logout")
@limiter.limit(settings.RATE_LIMIT_AUTH)
def logout(request: Request, response: Response):
    """Terminates authenticated session and clears the HttpOnly cookie."""
    response.delete_cookie(key="access_token", path="/")
    return {"message": "Logged out successfully"}


@router.get("/me", response_model=MeResponse)
def me(user: User | None = Depends(get_current_user_optional)):
    if not user:
        return MeResponse(authenticated=False, user=None)
    return MeResponse(authenticated=True, user=SessionUser.model_validate(user))


@router.put("/profile", response_model=SessionUser)
@limiter.limit(settings.RATE_LIMIT_REGISTRATION)
def complete_profile(
    request: Request,
    profile: CompleteProfileRequest,
    db: DBSession = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """
    Completes the existing user created through Google OAuth.
    No new User row is created.
    """
    profile_is_complete = all(
        value is not None
        for value in (user.roll_no, user.department, user.year)
    )

    if profile_is_complete:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Profile has already been completed and cannot be changed.",
        )

    # Google already supplied a name, but allow the student to correct it.
    user.name = profile.name
    user.roll_no = profile.roll_no
    user.department = profile.department
    user.year = profile.year

    db.commit()
    db.refresh(user)

    return SessionUser.model_validate(user)