// https://github.com/MostlyAdequate/mostly-adequate-guide/blob/master/ch8.md

import {expect} from 'chai';
import {Maybe} from './maybe';
import {property} from 'lodash';

describe('Functor', () => {
  it('should match a', () => {

    const maybe = Maybe.of('Malkovich Malkovich').map(match(/a/ig));
    expect(maybe.val()).to.eql(['a', 'a']);

  });

  it('should return null', () => {
    const maybe = Maybe.of(null).map(match(/a/ig));
    expect(maybe.val()).to.eql(null);
  });

  it('should add age', () => {
    const maybe = Maybe.of({
      name: 'Boris',
    }).map(property('age')).map(add(10));

    expect(maybe.val()).to.eql(null);
  });

  it('should add age', () => {
    const maybe = Maybe.of({
        name: 'Dinah',
        age: 14,
    }).map(property('age')).map(add(10));

    expect(maybe.val()).to.eql(24);
  });

  it('should apply one functor to another', function() {
    const maybe = Maybe.of(add).ap(Maybe.of(2)).ap(Maybe.of(3));

    expect(maybe.val()).to.eql(5);
  });

});

function match (regexp) {
  return str => str.match(new RegExp(regexp));
}

function add (a) {
  return b => a+b;
}