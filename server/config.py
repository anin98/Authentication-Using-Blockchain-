import os
import redis
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
load_dotenv()
class ApplicationConfig:
    SECRET_KEY = os.environ["SECRET_KEY"]
    SQLALCHEMY_TRACK_MODIFICATIONS =False
    SQLALCHEMY_ECHO =True
    SQLALCHEMY_DATABASE_URI = r"sqlite:///./db.sqlite"

    SESSION_TYPE = "redis"
    SESSION_PERMANET = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS=redis.from_url("redis://127.0.0.1:6379")

    CORS_SUPPORTS_CREDENTIALS= True

# <Route path="/" exact component={LandingPage} />
#         <Route path="/login" exact component={LoginPage} />
#         <Route path="/register" exact component={RegisterPage} />
# <Route component={NotFound} />
