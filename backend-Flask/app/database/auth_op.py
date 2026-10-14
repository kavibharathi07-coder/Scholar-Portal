from typing import Optional

from app.database.models import User


def check_user(
    email: str,
    password: str,
    role: str
) -> Optional[User]:

    # Find user using email
    user = User.query.filter_by(
        email=email
    ).first()

    # User does not exist
    if user is None:
        return None

    # Check requested role
    if user.role.lower() != role.lower():
        return None

    # Check password
    if not user.check_password(password):
        return None

    # Login successful
    return user

