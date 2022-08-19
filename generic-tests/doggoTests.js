const { describe, it } = require('mocha');
const { expect } = require('chai');

const { doggoCompetition } = require('./doggoCompetition');

describe('Doggo Tests', () => {
  it('should be 99 long', () => {
    expect(doggoCompetition(50).length).to.equals(99);
  });

  it('should have 100 if pos > 100', () => {
    expect(doggoCompetition(105).length).to.equal(100);
  });

  it('should not have 1st', () => {
    expect(doggoCompetition(1)).to.not.contain('1st');
  });

  it('should have 11th', () => {
    expect(doggoCompetition(1)).to.contain('11th');
  });

  it('last should be 100th', () => {
    expect(doggoCompetition(1).pop()).to.equal('100th');
  });
});
