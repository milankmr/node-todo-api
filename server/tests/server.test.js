const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const {ObjectID} = require('mongodb');

const todos = [{
  _id:new ObjectID(),
  text:'First test todo'
},{
  _id:new ObjectID(),
  text:'second test todo',
  complete:true,
  completedAt:333
}];


beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    Todo.insertMany(todos);
  }).then(()=>done());
});

describe('POST /todos',()=>{

  it('should create a new todo',(done)=>{
      var text = 'Test todo text';
      request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end((err,res)=>{
        if(err){
          return done(err);
        }

        Todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e)=> done(e));
      });
  });

  it('should not create todo with invalid body data',(done)=>{
    request(app)
    .post('/todos')
    .send({text:''})
    .expect(400)
    .end((err,res)=>{
      if(err){
        return done(err);
      }
      Todo.find().then((todos)=>{
        expect(todos.length).toBe(2);
        //expect(todos[0].text).toBe(text);
        done();
      }).catch((e)=> done(e));

    });
  });
});

describe('GET /todos',()=>{
  it('should get all todos',(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  })
});

describe('GET /todos/:id',()=>{
  it('shoult retuen todo doc',(done)=>{
    request(app)
    .get(`/todos/${todos[0]._id}`)
    .expect(200)
    .expect((res)=>{
      //console.log('here');
      //console.log(res.body.todo);
      //console.log(JSON.stringify(res.body,undefined,2));
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

it('should return 404 if todo not found',(done)=>{
var hexid = new ObjectID().toHexString();

request(app)
.get(`/todo/${hexid}`)
.expect(404)
.end(done);
});


it('should return 404 for non-object is',(done)=>{
request(app)
.get('/todos/123abc')
.expect(404)
.end(done);
});

});




describe('PATCH /todos/:id',()=>{
  it('should update the todo',(done)=>{
    var id = todos[0]._id.toHexString();
    request(app)
    .patch(`/todos/${id}`)
    .send({
      text:'New text',
      completed:true
    })
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe('New text');
      expect(res.body.todo.completed).toBe(true);
      expect(typeof res.body.todo.completedAt).toBe('number');
    })
    .end(done);

  });

  it('should clear completedAt when todo is not completed',(done)=>{
    var id = todos[1]._id.toHexString();
    request(app)
    .patch(`/todos/${id}`)
    .send({
      text:'New text',
      completed:false
    })
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe('New text');
      expect(res.body.todo.completedAt).toBe(null);
    })
    .end(done);

  });
});
