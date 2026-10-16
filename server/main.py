from starlette.middleware.sessions import SessionMiddleware

from contextlib import asynccontextmanager
from typing import Callable, cast

import uvicorn
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from fastapi import Depends, FastAPI, Request, Response
from slowapi.errors import RateLimitExceeded

from app.core.rate_limiter import apply_default_limit, limiter, rate_limit_exceeded_handler

from app.api.v1.api import api_router
from app.core.config import settings
from app.db.session import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    print(f"Starting {settings.APP_NAME} v{settings.APP_VERSION}")
    print(f"Environment: {settings.ENVIRONMENT}")
    print(f"Debug mode: {settings.DEBUG}")
    print(f"Docs available at: http://{settings.HOST}:{settings.PORT}/api/docs")
    init_db()
    yield
    print(f"Shutting down {settings.APP_NAME}")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="DEVS Investiture Backend API",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
    lifespan=lifespan,
    dependencies=[Depends(apply_default_limit)],
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, rate_limit_exceeded_handler)

app.add_middleware(
    SessionMiddleware,
    secret_key=settings.SECRET_KEY,
)

cors_origins = [
    settings.FRONTEND_URL.rstrip("/"),
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
]
if settings.CORS_ORIGINS and settings.CORS_ORIGINS != ["*"]:
    for origin in settings.CORS_ORIGINS:
        if origin and origin != "*":
            cors_origins.append(origin.rstrip("/"))

cors_origins = list(dict.fromkeys(cors_origins))

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=settings.CORS_ALLOW_CREDENTIALS,
    allow_methods=settings.CORS_ALLOW_METHODS,
    allow_headers=settings.CORS_ALLOW_HEADERS,
)


@app.api_route("/", methods=["GET", "HEAD"])
async def root():
    """Root endpoint - health check"""
    return JSONResponse(
        content={
            "message": "DEVS Investiture API",
            "version": settings.APP_VERSION,
            "status": "running",
            "docs": "/api/docs",
        }
    )


app.include_router(api_router, prefix="/api/v1")


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level=settings.LOG_LEVEL.lower(),
    )
