var express = require('express');
var router = express.Router();
var user= require('../db/user');
/* GET home page. */


module.exports = function(passport){
    router.post('/signup', function(req, res) {
        var body=req.body;
        username=body.username;
        password=body.password;
        user.findOne({username:username},function(err,doc){
            if(err)
            {
            res.status(500).send('Error Occurred')}
            else {
                if(doc){
                    res.status(500).send('User Already Exists')
                }
                else{
                    var record = new user()
                    record.username=username;
                    record.password=record.hashPassword(password)
                    record.save(function(err,user){
                        if(err){
                            res.status(500).send('Error in DB')
                        }
                        else{
                            res.send(user)
                        }

                    })
                }
            }
        })
      }); 
      router.post('/login',passport.authenticate('local', { successRedirect: '/profile',failureRedirect:'/login' }))
return router;
} ;