var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const {ObjectID} = require('mongodb');

var app = express();

//middleware
app.use(bodyParser.json());

//to create new todos
app.post('/todos',(req,res)=>{
  console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });

});

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  })
});

app.get('/todos/:id',(req,res)=>{
  //res.send(req.params);
  var id = req.params.id;

  //validatee ID using isValid
  if(!ObjectID.isValid(id)){
    //console.log('ID not valid');
    return res.status(404).send();
  }
  else {
    Todo.findById({_id:id}).then((todo)=>{
      if(todo)
      {
      res.send(todo);
    }else{
      res.status(404).send();
    }
    },(e)=>{
      res.send(404).send();
    });
  }

});

app.listen(3000,()=>{
  console.log('Server started on 3000');
});

module.exports = {app};
