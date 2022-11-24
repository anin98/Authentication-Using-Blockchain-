var redis   = require("redis");
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var client  = redis.createClient();
var axios = require('axios');
const cors = require('cors')
const express = require('express')
const app = express()
var crossOrigin = require('cross-origin');
const { Session } = require("express-session");
const port = 1000
const baseURL = 'http://localhost:2000';

app.use(session({
  secret: 'DWIDGWIUDGWIDGSBDSIDBDG',
  // create new redis store.
  store: new redisStore({ host: 'http://localhost:2000/me', port: 6379, client: client,ttl :  260}),
  saveUninitialized: false,
  resave: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(crossOrigin);


app.use(cors())

app.get('/blockchain',function(req,res){

});

app.get('/authenticate',cors(),crossOrigin,async function(req,res){
 let authenticate = await axios.post("http://localhost:2000/login",{"email" : "aningmail.com",
 "password": "pass"});
 console.log(authenticate);

   
        // fetch the user here
       
        var sess = '12224f28-0ffd-47e2-bdsce-f90a84eb74ec.rxTRaCqCgBNjzzy35zk620tboso';
        // var user;
        sess.id;
        var name = sess.name;

        
console.log(name)

        
        //console.log(user);
            
            // var sess = req.session.id;
            // console.log(res.send(sess.name));

    });    
    
app.get('/mine',function(req,res){

})
app.listen(port, function() {
  console.log(`listening on port ${port}`)
});
