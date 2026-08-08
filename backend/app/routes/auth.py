from flask import Blueprint, request, jsonify

from app.extensions import db
from database.auth_op import check_user


auth_bp = Blueprint("auth", __name__, url_prefix="http://localhost:5000")

# ======================================================
# LOGIN
# ======================================================

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}

    email = data.get("email")
    password = data.get("password")
    role=data.get("role")

    if not email or not role or not password:
        return jsonify({
            "error": "Email ,role and password are required."
        }), 400

    email = email.strip().lower()

    if check_user(password):
        return jsonify({
            "message": "Login successful.",
        }), 200
    
    return jsonify({
        "error": "Invalid email or password."
    }), 401