# Scholar Portal API

## Local development

1. Install dependencies with `uv sync`.
2. Start PostgreSQL and Redis from the repository root with `docker compose up -d postgres redis`.
3. Copy `.env.example` to `.env` if a local environment file is not already present.
4. Start the API with `uv run uvicorn main:app --reload`.

The API is available at `http://localhost:8000`; OpenAPI documentation is at
`http://localhost:8000/api/docs`.

## Full Docker stack

From the repository root:

```shell
docker compose up --build
```

The default PostgreSQL database is `scholar_db`. Set values in the root `.env`
file to override the compose defaults. Never commit `.env` files or production
credentials.