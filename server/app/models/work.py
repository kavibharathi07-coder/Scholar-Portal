from datetime import datetime

from sqlalchemy import (
    String,
    Integer,
    DateTime,
    ForeignKey,
    Text,
    UniqueConstraint
)

from sqlalchemy.orm import (
    Mapped,
    relationship,
    mapped_column
)

from app.db.session import Base

class Work(Base):
    __tablename__ = "works"

    __table_args__ = (
        UniqueConstraint(
            "submission_id",
            "work_number",
            name="uq_submission_work_number"
        ),
    )

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    submission_id: Mapped[int] = mapped_column(
        ForeignKey("weekly_submissions.id", ondelete="CASCADE"),
        nullable=False
    )

    work_number: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    title: Mapped[str] = mapped_column(
        String(200),
        nullable=False
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=True
    )

    file_url: Mapped[str] = mapped_column(
        String(500),
        nullable=False
    )

    submitted_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    # -------------------------
    # Relationships
    # -------------------------

    submission = relationship(
        "WeeklySubmission",
        back_populates="works"
    )

    evaluations = relationship(
        "Evaluation",
        back_populates="work",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return (
            f"<Work {self.work_number} "
            f"Submission={self.submission_id}>"
        )