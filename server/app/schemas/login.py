from pydantic import BaseModel


class LoginRequest(BaseModel):
    email: str | None = None
    password: str | None = None
    role: str | None = None
