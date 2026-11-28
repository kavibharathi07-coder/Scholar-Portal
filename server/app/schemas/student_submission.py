from enum import Enum
from pydantic import BaseModel, ConfigDict, Field


class SubmissionStatus(str, Enum):
    SUBMITTED = "SUBMITTED"


class TaskSubmissionData(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    submission_id: int = Field(..., gt=0)
    task_id: int = Field(..., gt=0)
    status: SubmissionStatus = SubmissionStatus.SUBMITTED


class TaskSubmissionResponse(BaseModel):
    success: bool = True
    message: str = "Task submitted successfully"
    data: TaskSubmissionData