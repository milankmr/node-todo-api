const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://milan:Sasken%401989@ds115712.mlab.com:15712/milandb").then((err,db)=>{
  console.log("connected to mlab database server");
},(err)=>{
  if(err){
    return console.log("err in connecting",err);
  }
}).catch((e)=>{
  console.log("Exception in connection",e);
});

//mongoose.connect("mongodb://localhost/TodoApp");

module.exports = {mongoose};
