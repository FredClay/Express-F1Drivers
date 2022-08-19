/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
const { describe, it, beforeEach } = require('mocha');
const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);
const { expect } = require('chai');

const { Driver } = require('../db');

const server = require('../index');

describe('Driver CRUD Testing', () => {
  let id;
  let testDrivers;

  beforeEach(async () => {
    await Driver.deleteMany({});
    testDrivers = await Driver.insertMany([{
      name: 'Max Verstappen',
      nationality: 'Netherlands',
      age: 24,
      height: 178.4,
    },
    {
      name: 'Mick Schumacher',
      nationality: 'Germany',
      age: 23,
      height: 188.4,
    },
    {
      name: 'Carlos Sainz',
      nationality: 'Spanish',
      age: 27,
      height: 182.3,
    }]);

    id = testDrivers[0]._id;
    testDrivers = JSON.parse(JSON.stringify(testDrivers));
  });

  it('new driver should be created', (done) => {
    const newDriver = {
      name: 'Lewis Hamilton',
      nationality: 'British',
      age: 34,
      height: 180.8,
    };
    chai.request(server).post('/drivers/createDriver').send(newDriver).end((err, res) => {
      expect(res.status).to.equal(201);
      expect(res.body).to.include(newDriver);
      expect(res.body._id).to.not.be.null;
      expect(err).to.be.null;

      return done();
    });
  });

  it('should update first driver', (done) => {
    chai.request(server).patch(`/drivers/updateDriver/${id}`).query({ name: 'Charles Leclerc', nationality: 'Monegasque' }).end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.include({
        name: 'Max Verstappen',
        nationality: 'Netherlands',
        age: 24,
        height: 178.4,
      });
      expect(err).to.be.null;
      return done();
    });
  });

  it('should get by id', (done) => {
    chai.request(server).get(`/drivers/getById/${id}`).end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.include({
        name: 'Max Verstappen',
        nationality: 'Netherlands',
      });
      expect(err).to.be.null;

      return done();
    });
  });

  it('getAll should be length 3', (done) => {
    chai.request(server).get('/drivers/getAll').end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(3);
      expect(res.body).to.deep.equals(testDrivers);
      expect(err).to.be.null;

      done();
    });
  });

  it('should delete first driver', (done) => {
    chai.request(server).delete(`/drivers/deleteDriver/${id}`).end((err, res) => {
      expect(res.status).to.equal(204);
      expect(err).to.be.null;

      done();
    });
  });
});
