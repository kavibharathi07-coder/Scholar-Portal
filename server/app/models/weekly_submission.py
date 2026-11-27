from datetime import datetime

from sqlalchemy import (
    String,
    Integer,
    DateTime,
    ForeignKey,
    UniqueConstraint
)

from sqlalchemy.orm import (
    Mapped,
    relationship,
    mapped_column
)

from app.db.session import Base

class WeeklySubmission(Base):
    __tablename__ = "weekly_submissions"

    __table_args__ = (
        UniqueConstraint(
            "student_id",
            "week_number",
            "year",
            name="uq_student_week_year"
        ),
    )

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    student_id: Mapped[int] = mapped_column(
        ForeignKey("students.id", ondelete="CASCADE"),
        nullable=False
    )

    # -------------------------
    # Relationships
    # -------------------------

    student = relationship(
        "Student",
        back_populates="submissions"
    )

    works = relationship(
        "Work",
        back_populates="submission",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return (
            f"<Submission Student={self.student_id} "
            f"Week={self.week_number}>"
        )

    week_number: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    year: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    submitted_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    status: Mapped[str] = mapped_column(
        String(20),
        default="Pending"
    )

    # -------------------------
    # Relationships
    # -------------------------

    student = relationship(
        "Student",
        back_populates="submissions"
    )

    works = relationship(
        "Work",
        back_populates="submission",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return (
            f"<Submission Student={self.student_id} "
            f"Week={self.week_number}>"
        )