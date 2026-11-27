from sqlalchemy import (
    String,
    Integer,
    ForeignKey
)

from sqlalchemy.orm import (
    Mapped,
    relationship,
    mapped_column
)

from app.db.session import Base

class Student(Base):
    __tablename__ = "students"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False
    )

    department: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    year: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    # -------------------------
    # Relationships
    # -------------------------

    user = relationship(
        "User",
        back_populates="student"
    )

    mentors = relationship(
        "StudentMentor",
        back_populates="student",
        cascade="all, delete-orphan"
    )

    submissions = relationship(
        "WeeklySubmission",
        back_populates="student",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Student {self.id}>"