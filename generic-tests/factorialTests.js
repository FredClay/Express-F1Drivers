const { describe, it } = require('mocha');
const { expect } = require('chai');

const { reverseFactorialOf } = require('./reverseFactorial');

describe('Factorial Tests', () => {
  it('should equal 5', () => {
    expect(reverseFactorialOf(120)).to.equal(5);
  });

  it('should equal 0', () => {
    expect(reverseFactorialOf(7)).to.equal(0);
  });

  it('should equal 1', () => {
    expect(reverseFactorialOf(1)).to.equal(1);
  });

  it('should equal 0', () => {
    expect(reverseFactorialOf(40320)).to.equal(8);
  });

  it('decimal should equal 0', () => {
    expect(reverseFactorialOf(7.1)).to.equal(0);
  });

  it('0 should equal 0', () => {
    expect(reverseFactorialOf(0)).to.equal(0);
  });

  it('sub-1 deciaml should equal 0', () => {
    expect(reverseFactorialOf(0.4)).to.equal(0);
  });

  it('negative should equal 0', () => {
    expect(reverseFactorialOf(-120)).to.equal(0);
  });
});
