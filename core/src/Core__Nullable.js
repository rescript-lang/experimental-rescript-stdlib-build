

import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Core__Option from "./Core__Option.js";

function fromOption(option) {
  if (option !== undefined) {
    return Caml_option.valFromOption(option);
  }
  
}

function equal(a, b, eq) {
  return Core__Option.equal((a == null) ? undefined : Caml_option.some(a), (b == null) ? undefined : Caml_option.some(b), eq);
}

function compare(a, b, cmp) {
  return Core__Option.compare((a == null) ? undefined : Caml_option.some(a), (b == null) ? undefined : Caml_option.some(b), cmp);
}

function getOr(value, $$default) {
  if (value == null) {
    return $$default;
  } else {
    return value;
  }
}

function getExn(value) {
  if (!(value == null)) {
    return value;
  }
  throw new Error("Invalid_argument", {
    cause: {
      RE_EXN_ID: "Invalid_argument",
      _1: "Nullable.getExn: value is null or undefined"
    }
  });
}

function forEach(value, f) {
  if (!(value == null)) {
    return f(value);
  }
  
}

function map(value, f) {
  if (value == null) {
    return value;
  } else {
    return f(value);
  }
}

function mapOr(value, $$default, f) {
  if (value == null) {
    return $$default;
  } else {
    return f(value);
  }
}

function flatMap(value, f) {
  if (value == null) {
    return value;
  } else {
    return f(value);
  }
}

let getWithDefault = getOr;

let mapWithDefault = mapOr;

export {
  equal,
  compare,
  fromOption,
  getOr,
  getWithDefault,
  getExn,
  forEach,
  map,
  mapOr,
  mapWithDefault,
  flatMap,
}
/* No side effect */
