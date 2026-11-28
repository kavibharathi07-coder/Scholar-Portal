from typing import Any
from pydantic import BaseModel, Field


class StudentInfo(BaseModel):
    id: int = Field(..., gt=0)
    name: str = Field(..., min_length=1)
    department: str = Field(..., min_length=1)
    mentor: str = Field(..., min_length=1)


class DashboardStats(BaseModel):
    assigned_tasks: int = Field(..., ge=0)
    completed_tasks: int = Field(..., ge=0)
    pending_tasks: int = Field(..., ge=0)
    pending_review: int = Field(..., ge=0)


class StudentDashboardData(BaseModel):
    student: StudentInfo
    stats: DashboardStats
    recent_tasks: list[dict[str, Any]] = Field(default_factory=list)
    recent_activity: list[dict[str, Any]] = Field(default_factory=list)


class StudentDashboardResponse(BaseModel):
    success: bool = True
    data: StudentDashboardData