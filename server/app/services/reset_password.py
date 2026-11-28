# services/reset_password.py

from passlib.context import CryptContext
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.User import User

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def reset_password(
    db: Session,
    email: str,
    new_password: str,
) -> bool:
    user = db.scalar(select(User).where(User.email == email))
    if not user:
        return False

    user.password_hash = pwd_context.hash(new_password)
    db.commit()
    db.refresh(user)

    return True