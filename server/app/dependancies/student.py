def _require_student(
    request: Request,
    current_user: User = Depends(get_current_user),
) -> User:
    # Ensure cookie token is present and user is authenticated as a student
    if not request.cookies.get("access_token"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token missing in cookie.",
        )

    if current_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token.",
        )

    if (current_user.role or "").strip().lower() != "student":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Student access required.",
        )

    email = (current_user.email or "").strip().lower()
    if not email.endswith("@rajalakshmi.edu.in"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Official @rajalakshmi.edu.in account required.",
        )

    if getattr(current_user, "is_active", True) is False:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive.",
        )

    return current_user


def get_student_dashboard_data(db: Session, student: User) -> dict[str, Any]:
    """Implement your database queries and dashboard aggregation here."""
    raise NotImplementedError("Implement get_student_dashboard_data")

def fetch_student_profile(db: Session, student: User) -> dict[str, Any]:
    """Implement DB query to return student profile fields."""
    raise NotImplementedError("Implement fetch_student_profile")


def update_student_profile(
    db: Session,
    student: User,
    updates: dict[str, Any],
) -> dict[str, Any]:
    """Implement DB update (check roll_no/phone uniqueness if needed) and return updated profile."""
    raise NotImplementedError("Implement update_student_profile")


def fetch_student_tasks(
    db: Session,
    student: User,
    task_status: TaskStatus | None = None,
    page: int = 1,
    limit: int = 10,
) -> list[dict[str, Any]]:
    """Implement DB query filtering tasks for this student by status, page, and limit."""
    raise NotImplementedError("Implement fetch_student_tasks")


def submit_student_task(
    db: Session,
    student: User,
    task_id: int,
    comment: str,
    file: UploadFile,
    file_bytes: bytes,
) -> dict[str, Any]:
    """Implement task ownership/eligibility check, file storage, and DB submission record creation."""
    raise NotImplementedError("Implement submit_student_task")


def fetch_student_progress(db: Session, student: User) -> dict[str, Any]:
    """Implement DB queries to compute task counts, completion_percentage, and progress_history."""
    raise NotImplementedError("Implement fetch_student_progress")