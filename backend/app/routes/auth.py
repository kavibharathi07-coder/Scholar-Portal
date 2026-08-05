from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.user import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already registered"}), 400

    if 'username' in data and User.query.filter_by(username=data['username']).first():
        return jsonify({"error": "Username already taken"}), 400
    new_user = User(
        name=data['name'],
        username=data.get('username'), 
        email=data['email'],
        role=data['role']
    )
    new_user.set_password(data['password'])

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    identifier = data.get('identifier') or data.get('email') 
    password = data.get('password')
    if not identifier or not password:
        return jsonify({"error": "Identifier and password are required"}), 400
    user = User.query.filter(
        db.or_(User.email == identifier, User.username == identifier)
    ).first()

    if user and user.check_password(password):
        return jsonify({
            "message": "Login successful!",
            "user": {
                "id": user.id,
                "name": user.name,
                "username": getattr(user, 'username', None),
                "email": user.email,
                "role": user.role
            }
        }), 200

    return jsonify({"error": "Invalid username/email or password"}), 401