const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

var id = '5afdb8223afb82060333fb27';

var user_id = '6afc6fa988cdf11caa9d3d66';

if(!ObjectID.isValid(id)){
  console.log('ID not valid');
}
//id ="5ae090b046c1f6241cb6bb4311"

//findOne is better if you are finding with a condigion
Todo.find({
  _id:id
}).then((todos)=>{
  console.log('Todos',todos);
}).catch((e)=>{
  console.log(e);
});

Todo.findOne({
  _id:id
}).then((todo)=>{
  console.log('Todo',todo);
}).catch((e)=>{
  console.log(e);
});

Todo.findById(id).then((todo)=>{
  if(!todo){
    return console.log('todo id not found');
  }
  console.log('Todo by id',todo);
}).catch((e)=>{
  console.log(e);
});

User.findById(user_id).then((user)=>{
  if(!user){
    return console.log('user id not found');
  }
  console.log('User by id',user);
}).catch((e)=>{
  console.log(e);
})
