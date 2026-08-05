from flask import Flask
from flask_cors import CORS
from .config import Config
from .extensions import db

def create_app():
  app=Flask(__name__)
  app.config.from_object(Config)
  CORS(app)
  db.init_app(app)
  from app.routes.auth import auth_bp

  app.register_blueprint(auth_bp, url_prefix='/api/auth')
  with app.app_context():
    from app.models.user import User
    db.create_all()

  @app.route('/')
  def index():
    return {"message":"Hello from the scholars program api!"}
  return app
