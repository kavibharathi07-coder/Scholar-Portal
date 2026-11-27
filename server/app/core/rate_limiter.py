from fastapi import Request
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from app.core.config import settings

default_limits = (
    [f"{settings.RATE_LIMIT_PER_MINUTE}/minute"]
    if settings.RATE_LIMIT_ENABLED
    else []
)

limiter = Limiter(
    key_func=get_remote_address,
    default_limits=default_limits,
    enabled=settings.RATE_LIMIT_ENABLED,
)


def rate_limit_exceeded_handler(
    request: Request,
    exc: RateLimitExceeded,
) -> JSONResponse:
    return JSONResponse(
        status_code=429,
        content={"error": f"Rate limit exceeded: {exc.detail}"},
    )