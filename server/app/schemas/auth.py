from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.enum.user_role import UserRole

class SessionUser(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id : int 
    email : str
    name : str
    role : UserRole
    roll_no : str | None = None
    department : str | None = None
    year : int | None = None
    is_active : bool


class MeResponse(BaseModel):
    authenticated : bool
    user : SessionUser | None = None

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int

class CompleteProfileRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=1, max_length=255)
    roll_no: str = Field(min_length=1, max_length=50)
    department: str = Field(min_length=1, max_length=100)
    year: int = Field(ge=2000, le=2100)

class ForgotPasswordRequestOtpRequest(BaseModel):
    email: EmailStr

class ForgotPasswordVerifyOtpRequest(BaseModel):
    email: EmailStr
    otp: str = Field(min_length=4, max_length=8)

class ForgotPasswordResetRequest(BaseModel):
    new_password: str = Field(min_length=8, max_length=128)
    confirm_password: str = Field(min_length=8, max_length=128)