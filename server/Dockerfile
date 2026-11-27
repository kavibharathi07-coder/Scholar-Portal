# syntax=docker/dockerfile:1
FROM ghcr.io/astral-sh/uv:0.9.5 AS uv
FROM python:3.12-slim

WORKDIR /app

COPY --from=uv /uv /uvx /bin/

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy \
    UV_PROJECT_ENVIRONMENT=/usr/local

COPY pyproject.toml uv.lock README.md ./
RUN uv sync --locked --no-install-project

COPY . .
RUN uv sync --locked

EXPOSE 8000

CMD ["uv", "run", "--no-sync", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
