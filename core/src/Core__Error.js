


var $$EvalError = {};

var $$RangeError = {};

var $$ReferenceError = {};

var $$SyntaxError = {};

var $$TypeError = {};

var $$URIError = {};

function panic(msg) {
  throw new Error("Panic! " + msg);
}

export {
  $$EvalError ,
  $$RangeError ,
  $$ReferenceError ,
  $$SyntaxError ,
  $$TypeError ,
  $$URIError ,
  panic ,
}
/* No side effect */
