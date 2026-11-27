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

class Mentor(Base):
    __tablename__ = "mentors"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False
    )

    designation: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    # -------------------------
    # Relationships
    # -------------------------

    user = relationship(
        "User",
        back_populates="mentor"
    )

    students = relationship(
        "StudentMentor",
        back_populates="mentor",
        cascade="all, delete-orphan"
    )

    evaluations = relationship(
        "Evaluation",
        back_populates="mentor",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Mentor {self.id}>"
