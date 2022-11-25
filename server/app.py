from flask import Flask,request,abort, jsonify,session
from flask_bcrypt import Bcrypt
from flask.json import jsonify
import json
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db,User,BlockHash
from blockchain import Blockchain
from flask_session import Session
import random
import sympy
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
@app.route("/tks",methods =["POST"])
def fetch_value_from_client():
    TempKeyClient = request.json["tempkeyclient"]
    HashClient = request.json["hashclient"]
    PublicKeyServer =request.json["PublicKeyServer"]


    PublicKeyClienthex = int(HashClient,16)
    print("PublicKeyClient is ",PublicKeyClienthex)
    # PublicKeyClient = int(PublicKeyClienthex,10)
    nonce = Blockchain.pendingNonce[-1]
        # Blockchain.pendingData[int(0)]
    print("Nonce is ", nonce)
    print("PublicKeyServer is ", PublicKeyServer)
    TempKeyServer = PublicKeyClienthex ** nonce % PublicKeyServer
    # print("TempKeyServer is ", TempKeyServer)
    print ("This is TempKeyClient dict",TempKeyClient)
    # TempKeyClient = TempKeyClient['number']
    # TempKeyClient = int(TempKeyClient[0])
    list1 = TempKeyClient['number']
    list1.reverse()
    print(list1)
    list1_elem_join = "".join([str(item) for item in list1])
    TempKeyClient=int(list1_elem_join)

    NonceUnified = TempKeyClient ** nonce % PublicKeyServer
    data = Blockchain.pendingData[-1]
    data = json.dumps(data, separators=(',', ':'))

    print(data)
    hashUnified= Blockchain.hashBlock(Blockchain,0,data,NonceUnified)
    print("TempKeyClient is",TempKeyClient)
    print("TempKeyServer is ", TempKeyServer)
    print("Nonce Unified is ", NonceUnified)
    print("Hash unified is ", hashUnified)
    id = (data[7:39])
    new_hash = BlockHash(us_id=id,nonce=NonceUnified,hash=hashUnified)
    db.session.add(new_hash)
    db.session.commit()



    return  jsonify({
        "TempKeyServer": TempKeyServer
    })


@cross_origin
@app.route("/block",methods =["POST"])
def get_current_block():
    data = request.json["data"]
    print(data)
    id = (data['id'])
    name = (data['name'])
    email = (data['email'])
    pwd =(data['password'])
    timestamp = (data['timestamp'])
    data = Blockchain.create_new_data(Blockchain,id,name,email,pwd,timestamp)
    nonce = Blockchain.proofOfWork(Blockchain,0,data)
    hash= Blockchain.hashBlock(Blockchain,0,data,nonce)
    print(nonce)
    print(hash)


    return jsonify({
       "data": data
    })

@cross_origin
@app.route("/pks",methods =["GET"])
def get_public_key_server():
   PublicKeyServer =sympy.randprime(1, 50)

   return  jsonify({
       "PublicKeyServer" : PublicKeyServer
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
    # db.session.execute("INSERT INTO Hash ('us_id','nonce','hash') Values ('24','13242','24rsvdgd')")
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
    # hashy = BlockHash.query.filter_by(us_id=user.id).order_by(BlockHash.created_at.desc()).first()

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email
        # "hash": hashy.hash

    })
@cross_origin
@app.route("/logout", methods=["POST"])
def logout_user():
    a = cross_origin()(login_user)
    print("user id is ",a)
    session.pop(a)
    return "200"
if __name__ == "__main__":
    app.run(debug=True)


#diffie hellman api
#diffie hellman initiation is from cliyent side
#v1*pri % pubkvcbxnvcxdbnzzb
