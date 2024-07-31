


function $$delete$1(dict, string) {
  delete(dict[string]);
}

function forEach(dict, f) {
  Object.values(dict).forEach(function (value) {
    f(value);
  });
}

function forEachWithKey(dict, f) {
  Object.entries(dict).forEach(function (param) {
    f(param[1], param[0]);
  });
}

function mapValues(dict, f) {
  let target = {};
  forEachWithKey(dict, (function (value, key) {
    target[key] = f(value);
  }));
  return target;
}

export {
  $$delete$1 as $$delete,
  forEach,
  forEachWithKey,
  mapValues,
}
/* No side effect */
