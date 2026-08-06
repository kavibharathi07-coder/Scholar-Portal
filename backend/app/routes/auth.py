from flask import Blueprint, request, jsonify

from app.extensions import db
from app.database.models import User

auth_bp = Blueprint("auth", __name__)


# ======================================================
# REGISTER
# ======================================================

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    required_fields = [
        "email",
        "password",
        "role"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({
                "error": f"{field} is required."
            }), 400

    existing_user = User.query.filter_by(
        email=data["email"]
    ).first()

    if existing_user:
        return jsonify({
            "error": "Email already registered."
        }), 400

    user = User(
        name=data["name"],
        email=data["email"],
        role=data["role"]
    )

    user.set_password(data["password"])

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully."
    }), 201


# ======================================================
# LOGIN
# ======================================================

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:

        return jsonify({
            "error": "Email and password are required."
        }), 400

    user = User.query.filter_by(
        email=email
    ).first()

    if user and user.check_password(password):

        return jsonify({

            "message": "Login successful.",

            "user": {

                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role

            }

        }), 200

    return jsonify({

        "error": "Invalid email or password."

    }), 401