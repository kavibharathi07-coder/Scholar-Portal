"""
Seed the database with sample users for testing.

The sample accounts use the Rajalakshmi college email domain.

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

    # --------------------------------------------------
    # Check if sample users already exist
    # --------------------------------------------------
    student_email = "student@rajalakshmi.edu.in"
    mentor_email = "mentor@rajalakshmi.edu.in"

    existing_student = User.query.filter_by(
        email=student_email
    ).first()

    existing_mentor = User.query.filter_by(
        email=mentor_email
    ).first()

    if existing_student or existing_mentor:
        print("Sample college users already exist.")
        return

    # --------------------------------------------------
    # Student User
    # --------------------------------------------------
    student_user = User(
        name="Student One",
        email=student_email,
        role="student",
    )

    student_user.set_password("Student@123")

    db.session.add(student_user)
    db.session.flush()

    # --------------------------------------------------
    # Student Profile
    # --------------------------------------------------
    student = Student(
        user_id=student_user.id,
        department="Computer Science",
        year=3,
    )

    db.session.add(student)
    db.session.flush()

    # --------------------------------------------------
    # Mentor User
    # --------------------------------------------------
    mentor_user = User(
        name="Mentor One",
        email=mentor_email,
        role="mentor",
    )

    mentor_user.set_password("Mentor@123")

    db.session.add(mentor_user)
    db.session.flush()

    # --------------------------------------------------
    # Mentor Profile
    # --------------------------------------------------
    mentor = Mentor(
        user_id=mentor_user.id,
        designation="Assistant Professor",
    )

    db.session.add(mentor)
    db.session.flush()

    # --------------------------------------------------
    # Student-Mentor Mapping
    # --------------------------------------------------
    mapping = StudentMentor(
        student_id=student.id,
        mentor_id=mentor.id,
    )

    db.session.add(mapping)

    # --------------------------------------------------
    # Commit all changes
    # --------------------------------------------------
    db.session.commit()

    # --------------------------------------------------
    # Success Message
    # --------------------------------------------------
    print("=" * 50)
    print("Database seeded successfully!")
    print("=" * 50)

    print("\nStudent Login")
    print("Email    :", student_email)
    print("Password : Student@123")

    print("\nMentor Login")
    print("Email    :", mentor_email)
    print("Password : Mentor@123")


if __name__ == "__main__":
    with app.app_context():
        seed_database()
