const sinon = require('sinon');
const supertest = require('supertest');
const app = require('../app');
const Order = require('../models/order');
const Product = require('../models/product');
const expect = require('chai').expect;
const mongoose = require('mongoose');
describe('Order Endpoint', () => {
    describe('POST /orders', () => {
        it('POST a new order', async () => {
            const OrderData = {
                products: '64d25deefea8e90c7615110c',
                users: '64d244b3f6a7410cf4dbf0a5'
            }

            const createStub = sinon.stub(Order, 'create').resolves(OrderData);
            const response = await supertest(app)
                .post('/orders')
                .send(OrderData);

            expect(response.status).to.equal(201);
            expect(response.body).to.deep.equal(OrderData);

            createStub.restore();

        });
    });
});

describe('Order Endpoint', () => {
    describe('GET /orders', () => {
      it('GET a list of orders', async () => {
        const userData = [
          { products: 'Product1', users: 'User1' },
          { products: 'Product2', users: 'User2', users: 'User3' }
        ];
        const findStub = sinon.stub(Order, 'find').resolves(userData);
  
        const response = await supertest(app)
          .get('/orders');
  
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(userData);
        findStub.restore();
      });
  
      it('Get an error 404', async () => {
        const findStub = sinon.stub(Order, 'find').rejects(new Error('Mocked error'));
  
        const response = await supertest(app)
          .get('/orders');
  
        
        expect(response.status).to.equal(404);
  
        
        findStub.restore();
      });
    });
});

describe('GET /orders/:id', () => {
    it('GET a order by Id', async () => {
      const orderId = '64d265accdbd65c20600311a';
      const orderData = {  products: 'Product1', users: 'User1' };
     
      const findByIdStub = sinon.stub(Order, 'findById').resolves(orderData);
     const response = await supertest(app)
        .get(`/orders/${orderId}`);

      
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(orderData);

      findByIdStub.restore();
    });

    it('GET an Error 404', async () => {
      const findByIdStub = sinon.stub(Order, 'findById').resolves(null);
      const response = await supertest(app)
        .get('/orders/64d265accdbd65c20600311a');
      
      expect(response.status).to.equal(404);

      findByIdStub.restore();
    });
});

describe('PUT /orders/:id', () => {
    it('PUT a order by Id', async () => {
      const orderId = '64d265accdbd65c20600311a';
      const updatedOrderData = {  products: 'updatedProduct1', users: 'updatedUser1' };
      const findByIdAndUpdateStub = sinon.stub(Order, 'findByIdAndUpdate').resolves(updatedOrderData);
  
      const response = await supertest(app)
        .put(`/orders/${orderId}`)
        .send(updatedOrderData);
  
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(updatedOrderData);
  
      findByIdAndUpdateStub.restore();
    });
  
    it('User not found during update', async () => {
        const orderId = '64d265accdbd65c20600311a';
        const updatedOrderData = {  products: 'updatedProduct1', users: 'updatedUser1' };
      const findByIdAndUpdateStub = sinon.stub(Order, 'findByIdAndUpdate').resolves(null); 
 
      const response = await supertest(app)
        .put(`/orders/${orderId}`)
        .send(updatedOrderData);
      expect(response.status).to.equal(404);
  
      findByIdAndUpdateStub.restore();
    });
  
    it('Errors during update', async () => {
        const orderId = '64d265accdbd65c20600311a';
        const updatedOrderData = {  products: 'updatedProduct1', users: 'updatedUser1' };
      const findByIdAndUpdateStub = sinon.stub(Order, 'findByIdAndUpdate').rejects(new Error('Mocked error'));
  
      const response = await supertest(app)
        .put(`/orders/${orderId}`)
        .send(updatedOrderData);
        expect(response.status).to.equal(500);
      findByIdAndUpdateStub.restore();
    });
  });

  describe('DELETE /orders/:id', () => {
    it('DELETE a order by Id', async () => {
        const orderId = '64d265accdbd65c20600311a';
        const deletedOrderData = {  products: 'deletedProduct1', users: 'deletedUser1' };

      const findByIdAndDeleteStub = sinon.stub(Order, 'findByIdAndDelete').resolves(deletedOrderData);
      const response = await supertest(app)
        .delete(`/orders/${orderId}`);
      expect(response.status).to.equal(200);

      findByIdAndDeleteStub.restore();
  });

  it('Order not found during delete', async () => {
    const orderId = '64d265accdbd65c20600311a';
    const findByIdAndDeleteStub = sinon.stub(Order, 'findByIdAndDelete').resolves(null);

    const response = await supertest(app)
      .delete(`/orders/${orderId}`);
    expect(response.status).to.equal(404);

    findByIdAndDeleteStub.restore();
  });

  it('Errors during delete', async () => {
    const orderId = '64d265accdbd65c20600311a';
    const findByIdAndDeleteStub = sinon.stub(Order, 'findByIdAndDelete').rejects(new Error('Mocked error'));

    const response = await supertest(app)
      .delete(`/orders/${orderId}`);
    expect(response.status).to.equal(500);

    findByIdAndDeleteStub.restore();
  })




  describe('NoSQL Injection Test', () => {
    it('Prevent NoSQL Injection attempt', async () => {
        const maliciousInput = { $ne: 'null' };
        const findStub = sinon.stub(Order, 'find').resolves([]);

        const response = await supertest(app)
            .get(`/orders?name=${JSON.stringify(maliciousInput)}`);
        expect(response.status).to.equal(200);
        findStub.restore();
    });
});});





