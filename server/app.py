from unicodedata import category
from flask import Flask,request,abort, jsonify,session, flash
from flask_bcrypt import Bcrypt
from flask.json import jsonify
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db,User
from flask_session import Session
import bcrypt
app = Flask(__name__)
CORS_ALLOW_ORIGIN="*,*"
CORS_EXPOSE_HEADERS="*,*"
CORS_ALLOW_HEADERS="content-type,*"
cors = CORS(app, origins=CORS_ALLOW_ORIGIN.split(","), allow_headers=CORS_ALLOW_HEADERS.split(",") , expose_headers= CORS_EXPOSE_HEADERS.split(","),   supports_credentials = True)




app.config.from_object(ApplicationConfig)
bcrypt = Bcrypt(app)
#CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)
with app.app_context():
    db.create_all()

@cross_origin()
@app.route("/@me",methods =["GET"], strict_slashes=False)
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}),401

    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email
    })
@cross_origin
@app.route("/register", methods =["POST"],strict_slashes=False)
def register_user():
    name = request.json["name"]
    email = request.json["email"]
    password =request.json["password"]
    #p_hashed = bcrypt.generate_password_hash(password)

    user_exists =User.query.filter_by(name=name).first() is not None

    if user_exists:
        abort(409)
    encrypted_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(name=name,email=email,password=encrypted_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        
    })
@cross_origin
@app.route("/login",methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
    #p_hashed1 = bcrypt.generate_password_hash(password)

    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "Unauthorized"}),401

    
    if bcrypt.check_password_hash(user.password, password):
        flash({f'Login successful'}, category="success")
    else:
        return jsonify({"error": "Unauthorized"}),401

    session["user_id"]= user.id

    return jsonify({
        "id": user.id
        
    })
@cross_origin
@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"
if __name__ == "__main__":
    app.run(debug=True)
