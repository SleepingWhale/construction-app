const app = require('../app');
const chai = require('chai');
const request = require('supertest');
const expect = chai.expect;


describe('Companies API Integration Tests', function() {

  describe('GET /companies', function() {

    it('should get no more then 50 companies', function(done) {
      request(app).get('/companies')
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.type).to.equal('application/json');
          expect(res.body.count).to.be.equal(res.body.data.length);
          expect(res.body.data).to.have.lengthOf.lessThan(51);
          done();
        });
    });

    it('should get companies by search query', function(done) {
      const search = 'py';

      request(app).get(`/companies/?search=${search}`)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.type).to.equal('application/json');
          expect(res.body.data[0].companyName.toLowerCase()).to.include(search);
          done();
        });
    });

    it('should get companies by filters', function(done) {
      const filters = ['Plumbing', 'Excavation'];

      request(app).get(`/companies/?filters[]=${filters[0]}&filters[]=${filters[1]}`)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.type).to.equal('application/json');
          expect(res.body.data[0].specialty).to.be.an('array').that.includes(filters[0]).and.includes(filters[1]);
          done();
        });
    });

    it('should get companies by search query and filters', function(done) {
      const filters = ['Plumbing', 'Excavation'];
      const search = 'py';

      request(app).get(`/companies/?search=${search}&filters[]=${filters[0]}&filters[]=${filters[1]}`)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.type).to.equal('application/json');
          expect(res.body.data[0].specialty).to.be.an('array').that.includes(filters[0]).and.includes(filters[1]);
          expect(res.body.data[0].companyName.toLowerCase()).to.include(search);
          done();
        });
    });

    it('should response with Unprocessable Entity', function(done) {
      request(app).get('/companies/?filters=test')
        .end(function(err, res) {
          expect(res.statusCode).to.equal(422);
          expect(res.body.errors).to.be.an('array').that.has.lengthOf.greaterThan(0);
          done();
        });
    });

  });

  describe('GET /companies/filters', function() {
    it('should return at least one filter', function(done) {
      request(app).get('/companies/filters')
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array').that.has.lengthOf.greaterThan(0);
          done();
        });
    });
  })

});
