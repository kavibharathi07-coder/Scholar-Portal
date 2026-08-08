"""
database.py

Provides access to the shared SQLAlchemy database instance.
"""

from app.extensions import db


def init_db(app):
    """
    Initialize the shared database with the Flask application.
    """

    db.init_app(app)