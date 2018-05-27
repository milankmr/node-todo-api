var mongoose = require('mongoose');
var validator = require('validator');
var _ = require('lodash');
var jwt = require('jsonwebtoken');


//var User = mongoose.model('User',{
var UserSchema = new mongoose.Schema({
  email:{
    type: String,
    required:true,
    trim:true,
    minlength: 1,
    unique:true,
    validate : {
      validator : validator.isEmail,
      message: '{VALUE} is not an email'
    }
  },
  password:{
    type:String,
    required:true,
    minlength:6,
  },
  tokens:[{
    access : {
      type:String,
      required: true
    },
    token:{
      type:String,
      required: true
    }}
  ]
});


//this is the instance method
UserSchema.methods.generateAuthToken = function(){
//current user who is calling generateAuthToken method
var user = this;
var access = 'auth';

var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();

user.tokens.push({access,token});
//user.tokens = user.tokens.concat([access,token]);
//returning a promise
return user.save().then(()=>{
  return token;
});

}

var User = mongoose.model('User',UserSchema);

module.exports = {User};
