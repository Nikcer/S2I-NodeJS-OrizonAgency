const sinon = require('sinon');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const expect = require('chai').expect;

describe('User Endpoint', () => {
  describe('POST /users', () => {
    it('POST a new user', async () => {
      const userData = {
        nome: 'TestNome',
        cognome: 'TestCognome',
        email: 'test@example.com'
      };

      
      const createStub = sinon.stub(User, 'create').resolves(userData);

      const response = await supertest(app)
        .post('/users')
        .send(userData);

      
      expect(response.status).to.equal(201);
      expect(response.body).to.deep.equal(userData);

      
      createStub.restore();
    });

    it('Errors during user creation', async () => {
      const userData = {
        nome: 'TestNome',
        cognome: 'TestCognome',
        email: 'test@example.com'
      };
      
      const createStub = sinon.stub(User, 'create').rejects(new Error('Mocked error'));

      const response = await supertest(app)
        .post('/users')
        .send(userData);
      
      expect(response.status).to.equal(500);
      
      createStub.restore();
    });
  });
});

describe('User Endpoint', () => {
    describe('GET /users', () => {
      it('GET a list of users', async () => {
        const userData = [
          { nome: 'User1', cognome: 'Cognome1', email: 'user1@example.com' },
          { nome: 'User2', cognome: 'Cognome2', email: 'user2@example.com' }
        ];
        const findStub = sinon.stub(User, 'find').resolves(userData);
  
        const response = await supertest(app)
          .get('/users');
  
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(userData);
        findStub.restore();
      });
  
      it('Get an error 404', async () => {
        const findStub = sinon.stub(User, 'find').rejects(new Error('Mocked error'));
  
        const response = await supertest(app)
          .get('/users');
  
        
        expect(response.status).to.equal(404);
  
        
        findStub.restore();
      });
    });
});

describe('GET /users/:id', () => {
    it('GET a user by Id', async () => {
      const userId = '64d300b3f6a7410cf4dbf0a9';
      const userData = { nome: 'User1', cognome: 'Cognome1', email: 'user1@example.com' };
     
      const findByIdStub = sinon.stub(User, 'findById').resolves(userData);
     const response = await supertest(app)
        .get(`/users/${userId}`);

      
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(userData);

      findByIdStub.restore();
    });

    it('GET an Error 404', async () => {
      const findByIdStub = sinon.stub(User, 'findById').resolves(null);
      const response = await supertest(app)
        .get('/users/64d300b3f6a7410cf4dbf0a9');
      
      expect(response.status).to.equal(404);

      findByIdStub.restore();
    });
});

  
describe('PUT /users/:id', () => {
    it('PUT a user by Id', async () => {
      const userId = '64d300b3f6a7410cf4dbf0a9';
      const updatedUserData = { nome: 'UpdatedUser', cognome: 'UpdatedCognome', email: 'updated@example.com' };
      const findByIdAndUpdateStub = sinon.stub(User, 'findByIdAndUpdate').resolves(updatedUserData);
  
      const response = await supertest(app)
        .put(`/users/${userId}`)
        .send(updatedUserData);
  
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(updatedUserData);
  
      findByIdAndUpdateStub.restore();
    });
  
    it('User not found during update', async () => {
      const userId = '64d300b3f6a7410cf4dbf0a9';
      const updatedUserData = { nome: 'UpdatedUser', cognome: 'UpdatedCognome', email: 'updated@example.com' };
      const findByIdAndUpdateStub = sinon.stub(User, 'findByIdAndUpdate').resolves(null); 
 
      const response = await supertest(app)
        .put(`/users/${userId}`)
        .send(updatedUserData);
      expect(response.status).to.equal(404);
  
      findByIdAndUpdateStub.restore();
    });
  
    it('Errors during update', async () => {
      const userId = '64d300b3f6a7410cf4dbf0a9';
      const updatedUserData = { nome: 'UpdatedUser', cognome: 'UpdatedCognome', email: 'updated@example.com' };
      const findByIdAndUpdateStub = sinon.stub(User, 'findByIdAndUpdate').rejects(new Error('Mocked error'));
  
      const response = await supertest(app)
        .put(`/users/${userId}`)
        .send(updatedUserData);
        expect(response.status).to.equal(500);
      findByIdAndUpdateStub.restore();
    });
  });
  
  

  
describe('DELETE /users/:id', () => {
    it('DELETE a user by Id', async () => {
      const userId = '64d25deefea8e90c9150110c';
      const deletedUserData = { nome: 'DeletedUser', cognome: 'DeletedCognome', email: 'deleted@example.com' };

      const findByIdAndDeleteStub = sinon.stub(User, 'findByIdAndDelete').resolves(deletedUserData);
      const response = await supertest(app)
        .delete(`/users/${userId}`);
      expect(response.status).to.equal(200);

      findByIdAndDeleteStub.restore();
  });

  it('User not found during delete', async () => {
    const userId = '64d25deefea8e90c9150110c';
    const findByIdAndDeleteStub = sinon.stub(User, 'findByIdAndDelete').resolves(null);

    const response = await supertest(app)
      .delete(`/users/${userId}`);
    expect(response.status).to.equal(404);

    findByIdAndDeleteStub.restore();
  });

  it('Errors during delete', async () => {
    const userId = '64d25deefea8e90c9150110c';
    const findByIdAndDeleteStub = sinon.stub(User, 'findByIdAndDelete').rejects(new Error('Mocked error'));

    const response = await supertest(app)
      .delete(`/users/${userId}`);
    expect(response.status).to.equal(500);

    findByIdAndDeleteStub.restore();
  })
  }); 


  describe('NoSQL Injection Test', () => {
      it('Prevent NoSQL Injection attempt', async () => {
          const maliciousInput = { $ne: 'null' };
          const findStub = sinon.stub(User, 'find').resolves([]);
  
          const response = await supertest(app)
              .get(`/users?name=${JSON.stringify(maliciousInput)}`);
          expect(response.status).to.equal(200);
          findStub.restore();
      });
  });
  

