from flask import Blueprint, request, jsonify
from app.extensions import db
from app.database.models import User

auth_bp = Blueprint('auth', __name__)
@auth_bp.route('/register',methods=['POST'])
def register():
     data=request.get_json()
     if User.query.filter_by(email=data['email']).first():
          return jsonify({"error":"Email already registered"}), 400

     new_user=User(
          name=data['name'],
          email=data['email'],
          role=data['role']
     )
     new_user.set_password(data['password'])

     db.session.add(new_user)
     db.session.commit()

     return jsonify({"message":"User registered successfully!"}), 201

@auth_bp.route('/login',methods=['POST'])
def login():
     data=request.get_json()
     user=User.query.filter_by(email=data['email']).first()
     if user and user.check_password(data['password']):
          return jsonify({
               "message":"Login successful!",
               "user":{
                    "id":user.id,
                    "name":user.name,
                    "email":user.email,
                    "role":user.role
               }
          }), 200
     return jsonify({"error":"Invalid email or password"}), 401

