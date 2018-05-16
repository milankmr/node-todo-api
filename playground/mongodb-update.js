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

//   db.collection('Todos').findOneAndUpdate({_id:new ObjectID('5afc60fbe4cabe1e16797302')},{
//   $set:{
//     completed:true
//   }
// },{
//   returnOriginal:false
// }).then((result)=>{
//   console.log(result);
// });


// db.collection('Users').findOneAndUpdate({name:'Kapil'},{
//   $set:{
//     name:'Milan'
//   }
// },{
//   returnOriginal:true
// }).then((result)=>{
//   console.log(result);
// });

db.collection('Users').findOneAndUpdate({name:'Milan'},{
  $inc:{
    age:1
  }
},{
  returnOriginal:true
}).then((result)=>{
  console.log(result);
});



  //client.close();
});
