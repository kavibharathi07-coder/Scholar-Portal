"""
seed.py

Seed the database with sample users.

Run:
    python -m app.database.seed
"""

from app import create_app
from app.extensions import db
from app.database.models import (
    User,
    Student,
    Mentor,
    StudentMentor,
)

app = create_app()


def seed_database():

    # Check if sample users already exist
    if User.query.filter_by(email="student@test.com").first():
        print("Sample data already exists.")
        return

    # -----------------------------
    # Student User
    # -----------------------------
    student_user = User(
        name="Student One",
        email="student@test.com",
        role="student",
    )
    student_user.set_password("student123")

    db.session.add(student_user)
    db.session.flush()

    student = Student(
        user_id=student_user.id,
        department="Computer Science",
        year=3,
    )

    db.session.add(student)
    db.session.flush()

    # -----------------------------
    # Mentor User
    # -----------------------------
    mentor_user = User(
        name="Mentor One",
        email="mentor@test.com",
        role="mentor",
    )
    mentor_user.set_password("mentor123")

    db.session.add(mentor_user)
    db.session.flush()

    mentor = Mentor(
        user_id=mentor_user.id,
        designation="Assistant Professor",
    )

    db.session.add(mentor)
    db.session.flush()

    # -----------------------------
    # Student-Mentor Mapping
    # -----------------------------
    mapping = StudentMentor(
        student_id=student.id,
        mentor_id=mentor.id,
    )

    db.session.add(mapping)

    db.session.commit()

    print("=" * 50)
    print("Database seeded successfully!")
    print("=" * 50)

    print("Student Login")
    print("Email    : student@test.com")
    print("Password : student123\n")

    print("Mentor Login")
    print("Email    : mentor@test.com")
    print("Password : mentor123")


if __name__ == "__main__":
    with app.app_context():
        seed_database()