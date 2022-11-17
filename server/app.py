from flask import Flask,request,abort, jsonify,session
from flask_bcrypt import Bcrypt
from flask.json import jsonify
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db,User,BlockHash
from flask_session import Session
app = Flask(__name__)

app.config.from_object(ApplicationConfig)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)
with app.app_context():
    db.create_all()

@cross_origin
@app.route("/me",methods =["GET"])
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
@app.route("/register", methods =["POST"])
def register_user():
    name = request.json["name"]
    email = request.json["email"]
    password =request.json["password"]
    user_exists =User.query.filter_by(name=name).first() is not None

    if user_exists:
        abort(409)
   #hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(name=name,email=email,password=password)
    db.session.add(new_user)
    db.session.commit()
 
    return jsonify({
        "id": new_user.id,
         "name": new_user.name,
        "email": new_user.email
    })

@cross_origin
@app.route("/mine", methods =["POST"])
def block_hash():
    us_id = request.json["us_id"]
    nonce = request.json["nonce"];
    hash = request.json["hash"];
    
    new_hash = BlockHash(us_id=us_id,nonce=nonce,hash=hash)
    db.session.add(new_hash)
    db.session.commit()

    return jsonify({
        "us_id": us_id,
         "nonce": nonce,
        "hash": hash
    })


@cross_origin
@app.route("/login",methods=["POST"])
def login_user():
    db.create_all()
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "Unauthorized"}),401

    passw = User.query.filter_by(password=password).first()
    if passw is None:
        return jsonify({"error": "Unauthorized"}),401

    session["user_id"]= user.id

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email
    })
@cross_origin
@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"
if __name__ == "__main__":
    app.run(debug=True)
