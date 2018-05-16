//const MongoClient = require('mongodb').MongoClient;
var {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);
// return;

// var user = {name:'Milan',age:25};
// var {name} = user;
// console.log(name);
// return;

MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser:true},(err,client)=>{

  if(err){
    return console.log('Unable to connec to Mondodb server');
  }

  console.log('Connected to MongoDB server');

  const db  = client.db('TodoApp');

  db.collection('Todos').insertOne({
    text:'Something to do',
    completed: false
  },(err,result)=>{
    if(err)
    {
      return console.log('Not able to insert todo',err);
    }
    console.log(JSON.stringify(result.ops,undefined,2));

  });

  db.collection('Users').insertOne({
    name:'Milan',
    age:25,
    location:'Noida'
  },(err,result)=>{
    if(err)
    {
      return console.log("Not able to add user in Users");
    }
    console.log(JSON.stringify(result.ops,undefined,2));
  });

  client.close();
});
