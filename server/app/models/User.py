from datetime import datetime

from sqlalchemy import (
    String,
    Integer,
    DateTime
)

from sqlalchemy.orm import (
    Mapped,
    relationship,
    mapped_column
)

import bcrypt

from app.db.session import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        String(120),
        unique=True,
        nullable=False
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    role: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    # -------------------------
    # Relationships
    # -------------------------

    student = relationship(
        "Student",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan"
    )

    mentor = relationship(
        "Mentor",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<User {self.email}>"

    def check_password(self, password: str) -> bool:
        password_bytes = password.encode("utf-8")
        if len(password_bytes) > 72:
            return False
        return bcrypt.checkpw(
            password_bytes,
            self.password_hash.encode("utf-8"),
        )