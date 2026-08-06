"""
models.py

Database Models for Scholars DB

Tables:
1. User
2. Student
3. Mentor
4. StudentMentor
5. WeeklySubmission
6. Work
7. Evaluation
"""

from datetime import datetime

from sqlalchemy import (
    String,
    Integer,
    DateTime,
    ForeignKey,
    Text,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from .database import db


# ============================================================
# USER TABLE
# ============================================================

class User(db.Model):
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

# ============================================================
# STUDENT TABLE
# ============================================================

class Student(db.Model):
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

# ============================================================
# MENTOR TABLE
# ============================================================

class Mentor(db.Model):
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

# ============================================================
# STUDENT - MENTOR MAPPING TABLE
# ============================================================

from sqlalchemy import UniqueConstraint


class StudentMentor(db.Model):
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


# ============================================================
# WEEKLY SUBMISSION TABLE
# ============================================================

class WeeklySubmission(db.Model):
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


# ============================================================
# WORK TABLE
# ============================================================

class Work(db.Model):
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


# ============================================================
# EVALUATION TABLE
# ============================================================

class Evaluation(db.Model):
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