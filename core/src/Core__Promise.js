

import * as Caml_js_exceptions from "rescript/lib/es6/caml_js_exceptions.js";

function $$catch(promise, callback) {
  return promise.catch(err => callback(Caml_js_exceptions.internalToOCamlException(err)));
}

export {
  $$catch,
}
/* No side effect */
