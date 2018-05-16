const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/TodoApp");

//create a modal

var Todo = mongoose.model('Todo',{
  text:{
    type: String,
    required:true,
    minlength:1,
    trim:true
  },
  completed:{
    type: Boolean,
    default:false
  },
  completedAt:{
    type: Number,
    default:null
  }
});

var User = mongoose.model('User',{
  email:{
    type: String,
    required:true,
    teim:true,
    minlength: 1
  }
})

var newUser = new User({
  email:'milankmr@gmail.com'
});


newUser.save().then((result)=>{
  console.log("user added");
  console.log(result)
},(e)=>{
  console.log("not able to create user",e);
});

// var newTodo = new Todo({
//   text:' Edit this video'
// });
// var newTodo = new Todo({
//   text:'Feed the Cat',
//   completed:true,
//   completedAt:123
// });

// newTodo.save().then((doc)=>{
//   console.log(JSON.stringify(doc,undefined,2));
// },(e)=>{
//   console.log("unable to save todo",e);
// });
