import os
fro dotenv imort load_dotenv
load_dotenv()

class Config:
  SQLALCHEMY_DATABASE_URI=os.geten('DATABASE_URL')
  SQLALCHEMY_TRACK_MODIFICATIONS=False
  SECRET_KEY = os.getenv('SECRET_KEY','default-secret-key')
