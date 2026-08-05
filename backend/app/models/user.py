from app.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False) # 'mentor', 'student', or 'admin'

    def set_password(self, password):
        # This converts "password123" into a secure string of gibberish
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        # This checks if the entered password matches the hash
        return check_password_hash(self.password_hash, password)