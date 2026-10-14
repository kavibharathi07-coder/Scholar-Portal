"""
Seed the database with sample users for testing.

The sample accounts use the Rajalakshmi college email domain.

Run from the backend folder:

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

    # ==================================================
    # SAMPLE LOGIN DETAILS
    # ==================================================

    student_email = "student@rajalakshmi.edu.in"
    student_password = "Student@123"

    mentor_email = "mentor@rajalakshmi.edu.in"
    mentor_password = "Mentor@123"

    # ==================================================
    # STUDENT
    # ==================================================

    existing_student = User.query.filter_by(
        email=student_email
    ).first()

    if existing_student:
        print("Student sample account already exists.")

    else:
        # --------------------------------------------------
        # Student User
        # --------------------------------------------------

        student_user = User(
            name="Student One",
            email=student_email,
            role="student",
        )

        # Hash password before storing it
        student_user.set_password(student_password)

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

        print("Student account created.")

    # ==================================================
    # MENTOR
    # ==================================================

    existing_mentor = User.query.filter_by(
        email=mentor_email
    ).first()

    if existing_mentor:
        print("Mentor sample account already exists.")

    else:
        # --------------------------------------------------
        # Mentor User
        # --------------------------------------------------

        mentor_user = User(
            name="Mentor One",
            email=mentor_email,
            role="mentor",
        )

        # Hash password before storing it
        mentor_user.set_password(mentor_password)

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

        print("Mentor account created.")

    # ==================================================
    # COMMIT USERS AND PROFILES
    # ==================================================

    db.session.commit()

    # ==================================================
    # CREATE STUDENT-MENTOR MAPPING
    # ==================================================

    # Fetch profiles from database
    student = Student.query.join(
        User
    ).filter(
        User.email == student_email
    ).first()

    mentor = Mentor.query.join(
        User
    ).filter(
        User.email == mentor_email
    ).first()

    if student and mentor:

        existing_mapping = StudentMentor.query.filter_by(
            student_id=student.id,
            mentor_id=mentor.id
        ).first()

        if existing_mapping:
            print("Student-Mentor mapping already exists.")

        else:
            mapping = StudentMentor(
                student_id=student.id,
                mentor_id=mentor.id,
            )

            db.session.add(mapping)
            db.session.commit()

            print("Student-Mentor mapping created.")

    # ==================================================
    # SUCCESS MESSAGE
    # ==================================================

    print()
    print("=" * 55)
    print("DATABASE SEEDING COMPLETED")
    print("=" * 55)

    print("\nSTUDENT LOGIN")
    print("-" * 30)
    print("Email    :", student_email)
    print("Password :", student_password)

    print("\nMENTOR LOGIN")
    print("-" * 30)
    print("Email    :", mentor_email)
    print("Password :", mentor_password)

    print("=" * 55)


# ======================================================
# RUN SEED
# ======================================================

if __name__ == "__main__":

    with app.app_context():
        seed_database()