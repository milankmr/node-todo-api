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

  //deleteMany
  // db.collection('Todos').deleteMany({text:'Eat Lunch'}).then((result)=>{
  //   console.log(result);
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text:'Eat Lunch'}).then((result)=>{
  //   console.log(result);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
  //   console.log(JSON.stringify(result,undefined,2));
  // });


  db.collection('Users').deleteMany({name:'Milan'}).then((result)=>{
    console.log("deleted");
  });

  db.collection('Users').findOneAndDelete({_id:new ObjectID('5afc5678e4cabe1e1679703b')}).then((result)=>{
    console.log(JSON.stringify(result,undefined,2));
  });

  //client.close();
});
