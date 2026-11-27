from datetime import datetime

from sqlalchemy import (
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import (
    Mapped,
    relationship,
    mapped_column
)

from app.db.session import Base

class StudentMentor(Base):
    __tablename__ = "student_mentor"

    student_id: Mapped[int] = mapped_column(
        ForeignKey("students.id", ondelete="CASCADE"),
        primary_key=True
    )

    mentor_id: Mapped[int] = mapped_column(
        ForeignKey("mentors.id", ondelete="CASCADE"),
        primary_key=True
    )

    assigned_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    # -------------------------
    # Relationships
    # -------------------------

    student = relationship(
        "Student",
        back_populates="mentors"
    )

    mentor = relationship(
        "Mentor",
        back_populates="students"
    )

    def __repr__(self):
        return (
            f"<StudentMentor Student={self.student_id}, "
            f"Mentor={self.mentor_id}>"
        )