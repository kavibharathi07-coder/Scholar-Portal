from datetime import datetime, timedelta, timezone

import jwt

from app.core.config import settings


def create_access_token(user_id: int) -> str:
    issued_at = datetime.now(timezone.utc)
    expires_at = issued_at + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    return jwt.encode(
        {
            "sub": str(user_id),
            "iat": issued_at,
            "exp": expires_at,
        },
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )
