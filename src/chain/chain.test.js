import {expect} from 'chai';
import {chain} from './chain';

describe('Chain functor', () => {
  it('should chain methods', () => {
    expect(true).to.eql(true);

    const greet = chain('Hello World');

    const reply = greet.
      map(str => str.slice(0,4)).
      map(str => `go to ${str}!`).
      map(str => str.toUpperCase());

    expect(greet.val()).to.eql('Hello World');
    expect(reply.val()).to.eql('GO TO HELL!');
  });
});