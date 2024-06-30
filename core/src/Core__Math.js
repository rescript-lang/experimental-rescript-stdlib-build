


var Constants = {};

function floor(f) {
  return Math.floor(f) | 0;
}

function ceil(f) {
  return Math.ceil(f) | 0;
}

function random(min, max) {
  var f = Math.random() * (max - min | 0);
  return (Math.floor(f) | 0) + min | 0;
}

var Int = {
  floor: floor,
  ceil: ceil,
  random: random
};

export {
  Constants ,
  Int ,
}
/* No side effect */
