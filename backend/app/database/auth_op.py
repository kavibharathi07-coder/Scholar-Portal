from typing import Optional
from app.database.models import User

def check_user(email: str,password: str,role: str)->Optional[User]:
    user = User.query.filter_by(email=email).first()
    if user is None:
        return None
    if user.role.lower()!=role.lower():
        return None
    if not user.check_password(password):
        return None
    return user