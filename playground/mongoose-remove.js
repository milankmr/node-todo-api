const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

Todo.remove({}).then((result)=>{
    console.log(result);
});

Todo.findOneAndRemove({_id:'5b0166629a8ed7f2d396c0a6'}).then((todo)=>{
  console.log(todo);
});

Todo.findByIdAndRemove('5b0166629a8ed7f2d396c0a6').then((todo)=>{
  console.log(JSON.stringify(todo,undefined,2));
});
