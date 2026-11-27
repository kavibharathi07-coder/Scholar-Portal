# services/reset_password.py

from sqlalchemy.orm import Session
from passlib.context import CryptContext

from models.User import User

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def reset_password_with_verified_otp(
    db: Session,
    email: str,
    new_password: str,
) -> bool:

    # Find user by email
    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        return False

    # Ensure OTP verification was completed
    if not user.reset_otp_verified:
        return False

    # Hash the new password
    hashed_password = pwd_context.hash(new_password)

    # Update password in database
    user.password = hashed_password

    # Prevent reuse of the same OTP verification
    user.reset_otp_verified = False

    db.commit()
    db.refresh(user)

    return True