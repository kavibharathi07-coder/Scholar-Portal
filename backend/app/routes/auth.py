from flask import Blueprint, request, jsonify

from app.extensions import db
from app.models.user import User

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")


def get_email_and_password():
    data = request.get_json(silent=True) or {}

    email = data.get("email")
    password = data.get("password")

    if not isinstance(email, str) or not email.strip():
        return None, None, jsonify({
            "error": "Valid email is required"
        }), 400

    if not isinstance(password, str) or not password:
        return None, None, jsonify({
            "error": "Password is required"
        }), 400

    email = email.strip().lower()

    if "@" not in email or "." not in email.split("@")[-1]:
        return None, None, jsonify({
            "error": "Invalid email format"
        }), 400

    return email, password, None, None


@auth_bp.post("/register")
def register():
    email, password, error_response, status_code = get_email_and_password()

    if error_response:
        return error_response, status_code

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({
            "error": "Email already registered"
        }), 409

    new_user = User(
        email=email,
        role="user"
    )

    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully"
    }), 201


@auth_bp.post("/login")
def login():
    email, password, error_response, status_code = get_email_and_password()

    if error_response:
        return error_response, status_code

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "email": user.email,
                "role": user.role
            }
        }), 200

    return jsonify({
        "error": "Invalid email or password"
    }), 401