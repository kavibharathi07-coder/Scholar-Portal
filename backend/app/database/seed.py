"""
seed.py

Seeds the database with sample data.

Run:
    python -m app.database.seed
"""

from app import create_app
from app.extensions import db, bcrypt

from app.database.models import (
    User,
    Student,
    Mentor,
    StudentMentor,
)


app = create_app()


with app.app_context():

    print("=" * 50)
    print("Checking sample data...")
    print("=" * 50)

    # -------------------------------------------------
    # Don't insert duplicates
    # -------------------------------------------------

    student_exists = User.query.filter_by(
        email="student@test.com"
    ).first()

    mentor_exists = User.query.filter_by(
        email="mentor@test.com"
    ).first()

    if student_exists or mentor_exists:
        print("Sample users already exist.")
        print("=" * 50)
        exit()

    # -------------------------------------------------
    # Student User
    # -------------------------------------------------

    student_user = User(
        name="Student One",
        email="student@test.com",
        password_hash=bcrypt.generate_password_hash(
            "student123"
        ).decode("utf-8"),
        role="student",
    )

    db.session.add(student_user)
    db.session.flush()

    student = Student(
        user_id=student_user.id,
        department="Computer Science",
        year=3,
    )

    db.session.add(student)

    # -------------------------------------------------
    # Mentor User
    # -------------------------------------------------

    mentor_user = User(
        name="Mentor One",
        email="mentor@test.com",
        password_hash=bcrypt.generate_password_hash(
            "mentor123"
        ).decode("utf-8"),
        role="mentor",
    )

    db.session.add(mentor_user)
    db.session.flush()

    mentor = Mentor(
        user_id=mentor_user.id,
        designation="Assistant Professor",
    )

    db.session.add(mentor)

    db.session.flush()

    # -------------------------------------------------
    # Student ↔ Mentor Mapping
    # -------------------------------------------------

    mapping = StudentMentor(
        student_id=student.id,
        mentor_id=mentor.id,
    )

    db.session.add(mapping)

    # -------------------------------------------------
    # Commit
    # -------------------------------------------------

    db.session.commit()

    print("Database seeded successfully.")
    print("=" * 50)

    print("\nSample Login Credentials\n")

    print("Student")
    print("Email    : student@test.com")
    print("Password : student123\n")

    print("Mentor")
    print("Email    : mentor@test.com")
    print("Password : mentor123")