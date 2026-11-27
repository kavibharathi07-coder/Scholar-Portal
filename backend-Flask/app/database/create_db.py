"""
create_db.py

Creates all database tables in PostgreSQL.

Run:
    python -m database.create_db
"""

from flask import Flask

from .database import init_db, db
from .models import (
    User,
    Student,
    Mentor,
    StudentMentor,
    WeeklySubmission,
    Work,
    Evaluation,
)


def create_app():
    """
    Creates a minimal Flask app for database operations.
    """

    app = Flask(__name__)

    init_db(app)

    return app


app = create_app()

with app.app_context():
    print("=" * 50)
    print("Creating Database Tables...")
    print("=" * 50)

    db.create_all()

    print("All tables created successfully!")
    print("=" * 50)