"""
database.py

Initializes the SQLAlchemy database instance and connects
the Flask application to the PostgreSQL database.

Database Name : scholars_db
"""

from flask_sqlalchemy import SQLAlchemy

# SQLAlchemy instance
db = SQLAlchemy()


def init_db(app):
    """
    Configure and initialize the database with the Flask app.
    """

    app.config["SQLALCHEMY_DATABASE_URI"] = (
        "postgresql://postgres:Kamal%40098%26@localhost:5432/scholars_db"
    )

    # Disable modification tracking (recommended)
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Initialize SQLAlchemy with Flask
    db.init_app(app)