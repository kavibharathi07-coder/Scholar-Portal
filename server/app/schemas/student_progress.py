from typing import Any
from pydantic import BaseModel, ConfigDict, Field


class StudentProgressData(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    total_tasks: int = Field(..., ge=0)
    completed_tasks: int = Field(..., ge=0)
    pending_tasks: int = Field(..., ge=0)
    pending_review: int = Field(..., ge=0)
    completion_percentage: float = Field(..., ge=0.0, le=100.0)
    progress_history: list[dict[str, Any]] = Field(default_factory=list)


class StudentProgressResponse(BaseModel):
    success: bool = True
    data: StudentProgressData