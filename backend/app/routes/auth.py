from flask import Blueprint, request, jsonify

from app.extensions import db
from database.auth_op import check_user


auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

# ======================================================
# LOGIN
# ======================================================

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    if not email or not password or not role:
        return jsonify({
            "error": "Fill the missing credentials properly."
        }), 400

    user = check_user(email, password, role)

    if user:
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role
            }
        }), 200

    return jsonify({
        "error": "Invalid email, password or role."
    }), 401