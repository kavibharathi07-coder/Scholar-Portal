from fastapi import APIRouter, Depends, HTTPException, status, Body, Query, File, UploadFile, Form, Path
from sqlalchemy.orm import Session
import os

from app.db.session import get_db
from app.models.User import User
from app.schemas.student_dashboard import (
    StudentDashboardData,
    StudentDashboardResponse,
)
from app.schemas.student_profile import (
    StudentProfileData,
    StudentProfileResponse,
    StudentProfileUpdateRequest,
)

from app.schemas.student_tasks import (
    StudentTaskItem,
    StudentTasksResponse,
    TaskStatus,
)

from app.schemas.student_submission import (
    TaskSubmissionData,
    TaskSubmissionResponse,
)

from app.schemas.student_progress import (
    StudentProgressData,
    StudentProgressResponse,
)

from app.dependancies.student import (
    get_student_dashboard_data,
    fetch_student_profile,
    update_student_profile,
    fetch_student_tasks,
    submit_student_task,
    fetch_student_progress,
    _require_student,
)

router = APIRouter(prefix="/student", tags=["student"])


@router.get("/dashboard", response_model=StudentDashboardResponse)
def get_student_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(_require_student),
) -> StudentDashboardResponse:
    dashboard_data = get_student_dashboard_data(db=db, student=current_user)
    validated_data = StudentDashboardData(**dashboard_data)
    return StudentDashboardResponse(success=True, data=validated_data)


@router.get("/profile", response_model=StudentProfileResponse)
def get_student_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(_require_student),
) -> StudentProfileResponse:
    profile_data = fetch_student_profile(db=db, student=current_user)
    validated_data = StudentProfileData.model_validate(profile_data)
    return StudentProfileResponse(success=True, data=validated_data)


@router.patch("/profile", response_model=StudentProfileResponse)
def patch_student_profile(
    payload: StudentProfileUpdateRequest | None = Body(default=None),
    db: Session = Depends(get_db),
    current_user: User = Depends(_require_student),
) -> StudentProfileResponse:
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Request body is required.",
        )

    updates = payload.model_dump(exclude_unset=True, exclude_none=True)
    if not updates:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="At least one valid field must be provided for update.",
        )

    updated_profile = update_student_profile(
        db=db,
        student=current_user,
        updates=updates,
    )
    validated_data = StudentProfileData.model_validate(updated_profile)
    return StudentProfileResponse(
        success=True,
        message="Profile updated successfully.",
        data=validated_data,
    )


@router.get("/tasks", response_model=StudentTasksResponse)
def get_student_tasks(
    task_status: TaskStatus | None = Query(default=None, alias="status"),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=10, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(_require_student),
) -> StudentTasksResponse:
    raw_tasks = fetch_student_tasks(
        db=db,
        student=current_user,
        task_status=task_status,
        page=page,
        limit=limit,
    )
    validated_tasks = [StudentTaskItem.model_validate(item) for item in raw_tasks]
    return StudentTasksResponse(success=True, data=validated_tasks)


MAX_SUBMISSION_FILE_BYTES = 10 * 1024 * 1024  # 10 MB
ALLOWED_EXTENSIONS = {".pdf", ".zip", ".doc", ".docx", ".txt", ".png", ".jpg", ".jpeg"}


@router.post(
    "/tasks/{task_id}/submissions",
    response_model=TaskSubmissionResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_task_submission(
    task_id: int = Path(..., gt=0),
    comment: str = Form(..., min_length=1, max_length=1000),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(_require_student),
) -> TaskSubmissionResponse:
    cleaned_comment = comment.strip()
    if not cleaned_comment:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Comment cannot be empty or whitespace.",
        )

    filename = (file.filename or "").strip()
    if not filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file must have a valid filename.",
        )

    ext = os.path.splitext(filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file type '{ext}'. Allowed: {', '.join(sorted(ALLOWED_EXTENSIONS))}.",
        )

    file_bytes = await file.read()

    if not file_bytes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty.",
        )

    if len(file_bytes) > MAX_SUBMISSION_FILE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File size exceeds the 10 MB limit.",
        )

    try:
        submission_result = submit_student_task(
            db=db,
            student=current_user,
            task_id=task_id,
            comment=cleaned_comment,
            file=file,
            file_bytes=file_bytes,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while submitting the task: {str(e)}",
        )
    finally:
        await file.close()

    validated_data = TaskSubmissionData.model_validate(submission_result)
    return TaskSubmissionResponse(
        success=True,
        message="Task submitted successfully",
        data=validated_data,
    )


@router.get("/progress", response_model=StudentProgressResponse)
def get_student_progress(
    db: Session = Depends(get_db),
    current_user: User = Depends(_require_student),
) -> StudentProgressResponse:
    progress_data = fetch_student_progress(db=db, student=current_user)
    validated_data = StudentProgressData.model_validate(progress_data)
    return StudentProgressResponse(success=True, data=validated_data)