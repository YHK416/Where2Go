var express = require('express');
var app = express.Router();
var firebase = require('firebase/app');
var bodyParser = require('body-parser');
require('firebase/auth');
require('firebase/database');



app.get('/', function(req, res){
  res.send('user router');
});

app.get('/login', function(req, res, next){
  res.render('login');
});

app.use('/test', function(req, res, next){
  res.redirect('../main');
});

app.get('/join', function(req, res){
  res.render('userJoin');
});

app.post('/userJoinAction', function(req, res){
  console.log(req.body);
  firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).catch(function(error){
  //firebase.auth().createUserWithEmailAndPassword('test@test.com','123123').catch(function(error){
    console.log(error);
    res.send("<script>alert('회원가입 오류')</script>");
  });
  firebase.auth().onAuthStateChanged(function(user){
    if(user){
      firebase.database().ref('users/' + user.uid).set({
        email: req.body.email,
        birth: req.body.birth
      });
      res.send('join complete');
    }
  });

  res.redirect('../main');
});

app.post('/loginChk', function(req, res, next){
  var email = req.body.inputEmail || req.query.inputEmail;
  console.log(email);
  console.log(req.body);
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch(function(error){
  //firebase.auth().signInWithEmailAndPassword('test@testmail.com', '123123').catch(function(error){
			console.log(error);
      res.send("<script>alert('아이디 또는 비밀번호가 틀렸습니다')</script>");
	});
  res.redirect('../main');
});

module.exports = app;
