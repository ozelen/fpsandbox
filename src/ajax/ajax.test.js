import {MONAD} from './ajax';
import {expect} from 'chai';

describe('Testing monad', function() {
  var monad;

  function init(value) {
    return 1;
  }

  function increment(value) {
    return value + 1;
  }

  function decrement(value) {
    return value - 1;
  }

  function log(value) {
    console.log(value);
    return value;
  }

  function get(value) {
    return value;
  }

  function testValue(value) {
    expect(value).to.equal(expected);
  }

  beforeEach(function() {
    monad = MONAD();
    monad.
      lift('init', init).
      lift('increment', increment).
      lift('decrement', decrement).
      lift('get', get).
      lift('log', log);
  });
  
  it('defines a monad with value', function() {
    monad(152).bind(function (value) {
      expect(value).to.equal(152);
    });
  });

  it('increments value of the monad', function() {
    monad(1).
      increment().

      bind(function (value) {
        expect(value).to.equal(2);
      });
  });

  it('increments value of the monad by 2', function() {
    monad(5).
      increment().
      increment().
      increment().

      bind(function (value) {
        expect(value).to.equal(8);
      });
  });

  it('decrements value of the monad by 2', function() {
    monad(10).
      increment().
      increment().
      decrement().
      decrement().
      decrement().

      bind(function (value) {
        expect(value).to.equal(9);
      });

  });

  it('should not change the value out of chain', function() {
    var unit = monad(100);

    unit.
      increment()
      increment()
      increment();

    unit.bind(function (value) {
      expect(value).to.equal(100);
    });

  });

});