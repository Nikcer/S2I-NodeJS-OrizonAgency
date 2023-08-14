const sinon = require('sinon');
const supertest = require('supertest');
const app = require('../app');
const Product = require('../models/product');
const expect = require('chai').expect;

describe('Products Endpoint', () => {
    describe('POST /products', () => {
      it('POST a new user', async () => {
        const productData = {
          nome: 'TestNome'
        };
  
        
        const createStub = sinon.stub(Product, 'create').resolves(productData);
  
        const response = await supertest(app)
          .post('/products')
          .send(productData);
  
        
        expect(response.status).to.equal(201);
        expect(response.body).to.deep.equal(productData);
  
        
        createStub.restore();
      });
  
      it('Errors during product creation', async () => {
        const productData = {
          nome: 'TestNome'
        };
        
        
        const createStub = sinon.stub(Product, 'create').rejects(new Error('Mocked error'));
  
        const response = await supertest(app)
          .post('/products')
          .send(productData);
        
        
        expect(response.status).to.equal(500);
  
        
        createStub.restore();
      });
    });
  });
  
describe('Product Endpoint', () => {
      describe('GET /products', () => {
        it('GET a list of products', async () => {
          const userData = [
            { nome: 'Product1' },
            { nome: 'Product2' }
          ];
          const findStub = sinon.stub(Product, 'find').resolves(userData);
    
          const response = await supertest(app)
            .get('/products');
    
          expect(response.status).to.equal(200);
          expect(response.body).to.deep.equal(userData);
          findStub.restore();
        });
    
        it('Get an error 404', async () => {
          const findStub = sinon.stub(Product, 'find').rejects(new Error('Mocked error'));
    
          const response = await supertest(app)
            .get('/products');
    
          
          expect(response.status).to.equal(404);
    
          
          findStub.restore();
        });
      });
  });
  
  describe('GET /products/:id', () => {
      it('GET a product by Id', async () => {
        const productId = '64d25deefea8e90c9150110c';
        const productData = { nome: 'Product1' };
       
       const findByIdStub = sinon.stub(Product, 'findById').resolves(productData);
       const response = await supertest(app)
          .get(`/products/${productId}`);
          
  
        
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(productData);
  
        findByIdStub.restore();
      });
  
      it('GET an Error 404', async () => {
        const findByIdStub = sinon.stub(Product, 'findById').resolves(null);
        const response = await supertest(app)
          .get('/products/64d25deefea8e90c9150110c');
        
        expect(response.status).to.equal(404);
  
        findByIdStub.restore();
      });
  }); 
  
  describe('PUT /products/:id', () => {
    it('PUT a product by Id', async () => {
      const productId = '64d25deefea8e90c9150110c';
      const updatedProductData = { nome: 'UpdatedProduct' };
      
      const findByIdAndUpdateStub = sinon.stub(Product, 'findByIdAndUpdate').resolves(updatedProductData);
  
      const response = await supertest(app)
        .put(`/products/${productId}`)
        .send(updatedProductData);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(updatedProductData);
      findByIdAndUpdateStub.restore();
    });
  
    it('Product not found during update', async () => {
      const productId = '64d25deefea8e90c9150110c';
      const updatedProductData = { nome: 'UpdatedProduct' };

      const findByIdAndUpdateStub = sinon.stub(Product, 'findByIdAndUpdate').resolves(null);
  
      const response = await supertest(app)
        .put(`/products/${productId}`)
        .send(updatedProductData);
      expect(response.status).to.equal(404);


      findByIdAndUpdateStub.restore();
    });
  
    it('Errors during update', async () => {
      const productId = '64d25deefea8e90c9150110c';
      const updatedProductData = { nome: 'UpdatedProduct' };
  
      const findByIdAndUpdateStub = sinon.stub(Product, 'findByIdAndUpdate').rejects(new Error('Mocked error'));
  
      const response = await supertest(app)
        .put(`/products/${productId}`)
        .send(updatedProductData);
  
      expect(response.status).to.equal(500);
      findByIdAndUpdateStub.restore();
    });
  });

  
  describe('DELETE /products/:id', () => {
    it('DELETE a product by Id', async () => {
      const productId = '64d25deefea8e90c9150110c';
      const deletedProductData = { nome: 'DeletedProduct' };

      const findByIdAndDeleteStub = sinon.stub(Product, 'findByIdAndDelete').resolves(deletedProductData);
      const response = await supertest(app)
        .delete(`/products/${productId}`);
      expect(response.status).to.equal(200);

      findByIdAndDeleteStub.restore();
  });

  it('Product not found during delete', async () => {
    const productId = '64d25deefea8e90c9150110c';
    const findByIdAndDeleteStub = sinon.stub(Product, 'findByIdAndDelete').resolves(null);

    const response = await supertest(app)
      .delete(`/products/${productId}`);
    expect(response.status).to.equal(404);

    findByIdAndDeleteStub.restore();
  });

  it('Errors during delete', async () => {
    const productId = '64d25deefea8e90c9150110c';
    const findByIdAndDeleteStub = sinon.stub(Product, 'findByIdAndDelete').rejects(new Error('Mocked error'));

    const response = await supertest(app)
      .delete(`/products/${productId}`);
    expect(response.status).to.equal(500);

    findByIdAndDeleteStub.restore();
  })
  });
  

  describe('NoSQL Injection Test', () => {
    it('Prevent NoSQL Injection attempt', async () => {
        const maliciousInput = { $ne: 'null' };
        const findStub = sinon.stub(Product, 'find').resolves([]);

        const response = await supertest(app)
            .get(`/products?name=${JSON.stringify(maliciousInput)}`);
        expect(response.status).to.equal(200);
        findStub.restore();
    });
}); 