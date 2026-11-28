import re
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class StudentProfileData(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., gt=0)
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: str | None = None
    roll_no: str | None = None
    department: str | None = None
    year: int | None = Field(default=None, ge=1, le=5)
    mentor: str | None = None


class StudentProfileUpdateRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str | None = Field(default=None, min_length=1, max_length=100)
    phone: str | None = Field(default=None, min_length=10, max_length=15)
    roll_no: str | None = Field(default=None, min_length=5, max_length=30)
    department: str | None = Field(default=None, min_length=2, max_length=50)
    year: int | None = Field(default=None, ge=1, le=5)

    @field_validator("name", "department", mode="before")
    @classmethod
    def strip_text(cls, value: str | None) -> str | None:
        if value is None:
            return None
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Field cannot be empty or whitespace.")
        return cleaned

    @field_validator("phone", mode="before")
    @classmethod
    def validate_phone(cls, value: str | None) -> str | None:
        if value is None:
            return None
        cleaned = value.strip()
        if not re.fullmatch(r"^[6-9]\d{9}$", cleaned):
            raise ValueError("Phone must be a valid 10-digit Indian mobile number.")
        return cleaned

    @field_validator("roll_no", mode="before")
    @classmethod
    def validate_roll_no(cls, value: str | None) -> str | None:
        if value is None:
            return None
        cleaned = value.strip().upper()
        if not re.fullmatch(r"^[A-Z0-9]+$", cleaned):
            raise ValueError("Roll number must be alphanumeric.")
        return cleaned


class StudentProfileResponse(BaseModel):
    success: bool = True
    message: str | None = None
    data: StudentProfileData