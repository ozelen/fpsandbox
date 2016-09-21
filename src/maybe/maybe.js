export
var Maybe = function(x) {
  this.__value = x;
};

Maybe.of = function(x) {
  return new Maybe(x);
};

Maybe.prototype.val = function () {
  return this.__value;
}

Maybe.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
};

Maybe.prototype.map = function(f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
};

// applicative feature
// https://github.com/MostlyAdequate/mostly-adequate-guide/blob/master/ch10.md
Maybe.prototype.ap = function(other_container) {
  return other_container.map(this.__value);
}