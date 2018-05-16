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

  db.collection('Users').find({
    name:'Milan'
  }).toArray().then((docs)=>{
    console.log('ToDos');

    console.log(JSON.stringify(docs,undefined,2));
  },(err)=>{
    console.log("Unable to fetch todos");
  });

  db.collection('Todos').find().count().then((count)=>{
    console.log(`ToDos Count:${count}`);
  },(err)=>{
    console.log("Unable to fetch todos");
  });

  //client.close();
});
