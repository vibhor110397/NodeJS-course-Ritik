let chai=require('chai');
let chaiHttp=require('chai-http');
const { doesNotThrow } = require('should');
let server=require("../server");

//assertion style
chai.should();

chai.use(chaiHttp);

describe('Task API',()=>{
  describe('get /api/users',()=>{
    it("It should Get all the task",(done)=>{
      chai.request(server)
      .get('/api/users')
      .end((err,response)=>{
        response.should.have.status(200);
        response.body.should.be.a('array');
        //response.body.length.should.be.eq(15);
        done();
    })
    
         })
         it("It should Not Get all the task",(done)=>{
          chai.request(server)
          .get('/apii/users')
          .end((err,response)=>{
            response.should.have.status(404);
            
            done();
        })
        
             })
             
             describe('post /api/users',()=>{
              it("It should Post a new  task",(done)=>{
                const task={
                  name: "ritik ",
                  email: "rpswzwddq00@gmail.com",
                  gender: "male",
                  status: "inactive"
                };
                chai.request(server)
                .post('/api/users')
                .send(task)
                .end((err,response)=>{
                  response.should.have.status(200);
                  response.body.should.be.a('object');

                  done();
              })
              
                   })
                   describe('PUT /api/users/:id',()=>{
                    it("It should put a new  task",(done)=>{
                      const taskId='62496b7da5767b25f8f60c54';
                      const task={
                        name: "ritik Pade"
                        
                      };
                      chai.request(server)
                      .put('/api/users/'+taskId)
                      .send(task)
                      .end((err,response)=>{
                        response.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('name').eq("ritik Pade");
      
                        done();
                    })
                    
                         })
                         describe('delete /api/users/:id',()=>{
                          it("It should delete a new  task",(done)=>{
                            const taskId='62496b7da5767b25f8f60c54';
                            chai.request(server)
                            .delete('/api/users/'+taskId)
                            .end((err,response)=>{
                              response.should.have.status(200);
                              done();
                          })
                          
                               })
                  
          
  })
  
  
  })
})
})
})