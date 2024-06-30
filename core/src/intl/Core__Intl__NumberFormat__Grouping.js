

import * as Core__Type from "../Core__Type.js";

function parseJsValue(value) {
  var value$1 = Core__Type.Classify.classify(value);
  if (typeof value$1 !== "object") {
    return ;
  }
  switch (value$1.TAG) {
    case "Bool" :
        return {
                NAME: "bool",
                VAL: value$1._0
              };
    case "String" :
        switch (value$1._0) {
          case "always" :
              return "always";
          case "auto" :
              return "auto";
          case "min2" :
              return "min2";
          default:
            return ;
        }
    default:
      return ;
  }
}

export {
  parseJsValue ,
}
/* No side effect */
