export const chain = value =>
  Object.create(methods, {_val: {value}});

const methods = {map, tap, val, toString};

function map(callback){
  return chain(callback(this._val));
}

function tap(callback) {
  return this.map(val => (callback(val), val));
}

function val () {
  return this._val;
}

function toString () {
  return this.val() + '';
}