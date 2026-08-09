from flask import Blueprint, request, jsonify

from app.database.auth_op import check_user


auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login", methods=["POST"])
def login():

    # Get JSON sent by React
    data = request.get_json(silent=True) or {}

    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    # Check required fields
    if not email or not password or not role:
        return jsonify({
            "error": "Email, password and role are required."
        }), 400

    # Normalize values
    email = email.strip().lower()
    role = role.strip().lower()

    # Only allow college email
    if not email.endswith("@rajalakshmi.edu.in"):
        return jsonify({
            "error": "Please use your official @rajalakshmi.edu.in email."
        }), 403

    # Validate role
    if role not in ["student", "mentor"]:
        return jsonify({
            "error": "Invalid role."
        }), 400

    # Check database
    user = check_user(
        email=email,
        password=password,
        role=role
    )

    # Invalid credentials
    if user is None:
        return jsonify({
            "error": "Invalid email, password or role."
        }), 401

    # Successful login
    return jsonify({
        "message": "Login successful.",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }), 200