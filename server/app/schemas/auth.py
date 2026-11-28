from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

#from app.enum.user_role import UserRole

class SessionUser(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id : int 
    email : str
    name : str
    role : str
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
    email: EmailStr
    otp: str = Field(min_length=6, max_length=6, pattern=r"^\d{6}$")
    new_password: str = Field(min_length=8, max_length=128)
    confirm_password: str = Field(min_length=8, max_length=128)

    @field_validator("new_password")
    @classmethod
    def enforce_bcrypt_byte_limit(cls, value: str) -> str:
        if len(value.encode("utf-8")) > 72:
            raise ValueError("Password must be no more than 72 UTF-8 bytes.")
        return value