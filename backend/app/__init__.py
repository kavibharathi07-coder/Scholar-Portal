from flask import Flask
from flask_cors import CORS

from .config import Config
from .extensions import db, bcrypt


def create_app():

    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Enable CORS
    CORS(app)

    # Initialize database
    db.init_app(app)
    bcrypt.init_app(app)

    # Register authentication routes
    from app.routes.auth import auth_bp

    app.register_blueprint(
        auth_bp,
        url_prefix="/api/auth"
    )

    # Create database tables
    with app.app_context():
        from app.database.models import User

        db.create_all()

    @app.route("/")
    def index():
        return {
            "message": "Hello from the scholars program api!"
        }

    return app
