from datetime import datetime

from sqlalchemy import (
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

class Evaluation(Base):
    __tablename__ = "evaluations"

    __table_args__ = (
        UniqueConstraint(
            "work_id",
            "mentor_id",
            name="uq_work_mentor"
        ),
    )

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    work_id: Mapped[int] = mapped_column(
        ForeignKey("works.id", ondelete="CASCADE"),
        nullable=False
    )

    mentor_id: Mapped[int] = mapped_column(
        ForeignKey("mentors.id", ondelete="CASCADE"),
        nullable=False
    )

    score: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    feedback: Mapped[str] = mapped_column(
        Text,
        nullable=True
    )

    evaluated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    # -------------------------
    # Relationships
    # -------------------------

    work = relationship(
        "Work",
        back_populates="evaluations"
    )

    mentor = relationship(
        "Mentor",
        back_populates="evaluations"
    )

    def __repr__(self):
        return (
            f"<Evaluation Work={self.work_id} "
            f"Mentor={self.mentor_id}>"
        )