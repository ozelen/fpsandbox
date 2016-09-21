export
function MONAD() {
  var prototype = Object.create(null);

  unit.method = method;
  unit.lift = lift;

  return unit;

  function method(name, func) {
    prototype[name] = func;
    return unit;
  }

  function lift(name, func) {
    prototype[name] = function () {
      return unit(this.bind(func));
    };
    return unit;
  }

  function unit(value) {
    var monad = Object.create(prototype);
    monad.bind = function (func) {
      return func(value);
    };
    return monad;
  }
}