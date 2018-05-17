var mongoose = require('mongoose');
var User = mongoose.model('User',{
  email:{
    type: String,
    required:true,
    teim:true,
    minlength: 1
  }
})

module.exports = {User};
