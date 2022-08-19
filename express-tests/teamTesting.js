/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
const { describe, it, beforeEach } = require('mocha');
const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);
const { expect } = require('chai');

const { Team } = require('../db');

const server = require('../index');

describe('Team CRUD Testing', () => {
  let id;
  let testTeams;

  beforeEach(async () => {
    await Team.deleteMany({});
    testTeams = await Team.insertMany([{
      name: 'McLaren',
      homeCountry: 'England',
      yearFounded: 1980,
      teamPrincipal: 'Andreas Seidl',
    },
    {
      name: 'Red Bull Racing',
      homeCountry: 'Austria',
      yearFounded: 2007,
      teamPrincipal: 'Christian Horner',
    }]);

    id = testTeams[0]._id;
    testTeams = JSON.parse(JSON.stringify(testTeams));
  });

  it('should create new team', (done) => {
    const newTeam = {
      name: 'Haas',
      homeCountry: 'USA',
      yearFounded: 2018,
      teamPrincipal: 'Guenther Steiner',
    };
    chai.request(server).post('/teams/createTeam').send(newTeam).end((err, res) => {
      expect(res.status).to.equal(201);
      expect(res.body).to.include(newTeam);
      expect(res.body._id).to.not.be.null;
      expect(err).to.be.null;

      done();
    });
  });

  it('should update first team', (done) => {
    chai.request(server).patch(`/teams/updateTeam/${id}`)
      .query({ name: 'Ferrari', homeCountry: 'Italy', yearFounded: 1950 }).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.include(JSON.parse(JSON.stringify(testTeams[0])));
        expect(err).to.be.null;

        done();
      });
  });

  it('should get first team by Id', (done) => {
    chai.request(server).get(`/teams/getById/${id}`).end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.include({
        name: 'McLaren',
        teamPrincipal: 'Andreas Seidl',
      });
      expect(err).to.be.null;

      done();
    });
  });

  it('should getAll with length 2', (done) => {
    chai.request(server).get('/teams/getAll').end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
      expect(err).to.be.null;

      done();
    });
  });
});
