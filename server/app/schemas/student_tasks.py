from datetime import date
from enum import Enum
from pydantic import BaseModel, ConfigDict, Field


class TaskStatus(str, Enum):
    ASSIGNED = "ASSIGNED"
    SUBMITTED = "SUBMITTED"
    APPROVED = "APPROVED"


class StudentTaskItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    task_id: int = Field(..., gt=0)
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1)
    assigned_by: str = Field(..., min_length=1, max_length=100)
    assigned_date: date
    due_date: date
    status: TaskStatus


class StudentTasksResponse(BaseModel):
    success: bool = True
    data: list[StudentTaskItem] = Field(default_factory=list)