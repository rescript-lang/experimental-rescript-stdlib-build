

import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Core__Array from "./Core__Array.js";

function head(x) {
  if (x) {
    return Caml_option.some(x.hd);
  }
  
}

function headExn(x) {
  if (x) {
    return x.hd;
  }
  throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
}

function tail(x) {
  if (x) {
    return x.tl;
  }
  
}

function tailExn(x) {
  if (x) {
    return x.tl;
  }
  throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
}

function add(xs, x) {
  return {
          hd: x,
          tl: xs
        };
}

function get(x, n) {
  if (n < 0) {
    return ;
  } else {
    var _x = x;
    var _n = n;
    while(true) {
      var n$1 = _n;
      var x$1 = _x;
      if (!x$1) {
        return ;
      }
      if (n$1 === 0) {
        return Caml_option.some(x$1.hd);
      }
      _n = n$1 - 1 | 0;
      _x = x$1.tl;
      continue ;
    };
  }
}

function getExn(x, n) {
  if (n < 0) {
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  }
  var _x = x;
  var _n = n;
  while(true) {
    var n$1 = _n;
    var x$1 = _x;
    if (x$1) {
      if (n$1 === 0) {
        return x$1.hd;
      }
      _n = n$1 - 1 | 0;
      _x = x$1.tl;
      continue ;
    }
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  };
}

function partitionAux(p, _cell, _precX, _precY) {
  while(true) {
    var precY = _precY;
    var precX = _precX;
    var cell = _cell;
    if (!cell) {
      return ;
    }
    var t = cell.tl;
    var h = cell.hd;
    var next = {
      hd: h,
      tl: /* [] */0
    };
    if (p(h)) {
      precX.tl = next;
      _precX = next;
      _cell = t;
      continue ;
    }
    precY.tl = next;
    _precY = next;
    _cell = t;
    continue ;
  };
}

function splitAux(_cell, _precX, _precY) {
  while(true) {
    var precY = _precY;
    var precX = _precX;
    var cell = _cell;
    if (!cell) {
      return ;
    }
    var match = cell.hd;
    var nextA = {
      hd: match[0],
      tl: /* [] */0
    };
    var nextB = {
      hd: match[1],
      tl: /* [] */0
    };
    precX.tl = nextA;
    precY.tl = nextB;
    _precY = nextB;
    _precX = nextA;
    _cell = cell.tl;
    continue ;
  };
}

function copyAuxCont(_cellX, _prec) {
  while(true) {
    var prec = _prec;
    var cellX = _cellX;
    if (!cellX) {
      return prec;
    }
    var next = {
      hd: cellX.hd,
      tl: /* [] */0
    };
    prec.tl = next;
    _prec = next;
    _cellX = cellX.tl;
    continue ;
  };
}

function copyAuxWitFilter(f, _cellX, _prec) {
  while(true) {
    var prec = _prec;
    var cellX = _cellX;
    if (!cellX) {
      return ;
    }
    var t = cellX.tl;
    var h = cellX.hd;
    if (f(h)) {
      var next = {
        hd: h,
        tl: /* [] */0
      };
      prec.tl = next;
      _prec = next;
      _cellX = t;
      continue ;
    }
    _cellX = t;
    continue ;
  };
}

function copyAuxWithFilterIndex(f, _cellX, _prec, _i) {
  while(true) {
    var i = _i;
    var prec = _prec;
    var cellX = _cellX;
    if (!cellX) {
      return ;
    }
    var t = cellX.tl;
    var h = cellX.hd;
    if (f(h, i)) {
      var next = {
        hd: h,
        tl: /* [] */0
      };
      prec.tl = next;
      _i = i + 1 | 0;
      _prec = next;
      _cellX = t;
      continue ;
    }
    _i = i + 1 | 0;
    _cellX = t;
    continue ;
  };
}

function copyAuxWitFilterMap(f, _cellX, _prec) {
  while(true) {
    var prec = _prec;
    var cellX = _cellX;
    if (!cellX) {
      return ;
    }
    var t = cellX.tl;
    var h = f(cellX.hd);
    if (h !== undefined) {
      var next = {
        hd: Caml_option.valFromOption(h),
        tl: /* [] */0
      };
      prec.tl = next;
      _prec = next;
      _cellX = t;
      continue ;
    }
    _cellX = t;
    continue ;
  };
}

function removeAssocAuxWithMap(_cellX, x, _prec, f) {
  while(true) {
    var prec = _prec;
    var cellX = _cellX;
    if (!cellX) {
      return false;
    }
    var t = cellX.tl;
    var h = cellX.hd;
    if (f(h[0], x)) {
      prec.tl = t;
      return true;
    }
    var next = {
      hd: h,
      tl: /* [] */0
    };
    prec.tl = next;
    _prec = next;
    _cellX = t;
    continue ;
  };
}

function setAssocAuxWithMap(_cellX, x, k, _prec, eq) {
  while(true) {
    var prec = _prec;
    var cellX = _cellX;
    if (!cellX) {
      return false;
    }
    var t = cellX.tl;
    var h = cellX.hd;
    if (eq(h[0], x)) {
      prec.tl = {
        hd: [
          x,
          k
        ],
        tl: t
      };
      return true;
    }
    var next = {
      hd: h,
      tl: /* [] */0
    };
    prec.tl = next;
    _prec = next;
    _cellX = t;
    continue ;
  };
}

function copyAuxWithMap(_cellX, _prec, f) {
  while(true) {
    var prec = _prec;
    var cellX = _cellX;
    if (!cellX) {
      return ;
    }
    var next = {
      hd: f(cellX.hd),
      tl: /* [] */0
    };
    prec.tl = next;
    _prec = next;
    _cellX = cellX.tl;
    continue ;
  };
}

function zipAux(_cellX, _cellY, _prec) {
  while(true) {
    var prec = _prec;
    var cellY = _cellY;
    var cellX = _cellX;
    if (!cellX) {
      return ;
    }
    if (!cellY) {
      return ;
    }
    var next = {
      hd: [
        cellX.hd,
        cellY.hd
      ],
      tl: /* [] */0
    };
    prec.tl = next;
    _prec = next;
    _cellY = cellY.tl;
    _cellX = cellX.tl;
    continue ;
  };
}

function copyAuxWithMap2(f, _cellX, _cellY, _prec) {
  while(true) {
    var prec = _prec;
    var cellY = _cellY;
    var cellX = _cellX;
    if (!cellX) {
      return ;
    }
    if (!cellY) {
      return ;
    }
    var next = {
      hd: f(cellX.hd, cellY.hd),
      tl: /* [] */0
    };
    prec.tl = next;
    _prec = next;
    _cellY = cellY.tl;
    _cellX = cellX.tl;
    continue ;
  };
}

function copyAuxWithMapI(f, _i, _cellX, _prec) {
  while(true) {
    var prec = _prec;
    var cellX = _cellX;
    var i = _i;
    if (!cellX) {
      return ;
    }
    var next = {
      hd: f(cellX.hd, i),
      tl: /* [] */0
    };
    prec.tl = next;
    _prec = next;
    _cellX = cellX.tl;
    _i = i + 1 | 0;
    continue ;
  };
}

function takeAux(_n, _cell, _prec) {
  while(true) {
    var prec = _prec;
    var cell = _cell;
    var n = _n;
    if (n === 0) {
      return true;
    }
    if (!cell) {
      return false;
    }
    var cell$1 = {
      hd: cell.hd,
      tl: /* [] */0
    };
    prec.tl = cell$1;
    _prec = cell$1;
    _cell = cell.tl;
    _n = n - 1 | 0;
    continue ;
  };
}

function splitAtAux(_n, _cell, _prec) {
  while(true) {
    var prec = _prec;
    var cell = _cell;
    var n = _n;
    if (n === 0) {
      return cell;
    }
    if (!cell) {
      return ;
    }
    var cell$1 = {
      hd: cell.hd,
      tl: /* [] */0
    };
    prec.tl = cell$1;
    _prec = cell$1;
    _cell = cell.tl;
    _n = n - 1 | 0;
    continue ;
  };
}

function take(lst, n) {
  if (n < 0) {
    return ;
  }
  if (n === 0) {
    return /* [] */0;
  }
  if (!lst) {
    return ;
  }
  var cell = {
    hd: lst.hd,
    tl: /* [] */0
  };
  var has = takeAux(n - 1 | 0, lst.tl, cell);
  if (has) {
    return cell;
  }
  
}

function drop(lst, n) {
  if (n < 0) {
    return ;
  } else {
    var _l = lst;
    var _n = n;
    while(true) {
      var n$1 = _n;
      var l = _l;
      if (n$1 === 0) {
        return l;
      }
      if (!l) {
        return ;
      }
      _n = n$1 - 1 | 0;
      _l = l.tl;
      continue ;
    };
  }
}

function splitAt(lst, n) {
  if (n < 0) {
    return ;
  }
  if (n === 0) {
    return [
            /* [] */0,
            lst
          ];
  }
  if (!lst) {
    return ;
  }
  var cell = {
    hd: lst.hd,
    tl: /* [] */0
  };
  var rest = splitAtAux(n - 1 | 0, lst.tl, cell);
  if (rest !== undefined) {
    return [
            cell,
            rest
          ];
  }
  
}

function concat(xs, ys) {
  if (!xs) {
    return ys;
  }
  var cell = {
    hd: xs.hd,
    tl: /* [] */0
  };
  copyAuxCont(xs.tl, cell).tl = ys;
  return cell;
}

function map(xs, f) {
  if (!xs) {
    return /* [] */0;
  }
  var cell = {
    hd: f(xs.hd),
    tl: /* [] */0
  };
  copyAuxWithMap(xs.tl, cell, f);
  return cell;
}

function zipBy(l1, l2, f) {
  if (!l1) {
    return /* [] */0;
  }
  if (!l2) {
    return /* [] */0;
  }
  var cell = {
    hd: f(l1.hd, l2.hd),
    tl: /* [] */0
  };
  copyAuxWithMap2(f, l1.tl, l2.tl, cell);
  return cell;
}

function mapWithIndex(xs, f) {
  if (!xs) {
    return /* [] */0;
  }
  var cell = {
    hd: f(xs.hd, 0),
    tl: /* [] */0
  };
  copyAuxWithMapI(f, 1, xs.tl, cell);
  return cell;
}

function fromInitializer(n, f) {
  if (n <= 0) {
    return /* [] */0;
  }
  var headX = {
    hd: f(0),
    tl: /* [] */0
  };
  var cur = headX;
  var i = 1;
  while(i < n) {
    var v = {
      hd: f(i),
      tl: /* [] */0
    };
    cur.tl = v;
    cur = v;
    i = i + 1 | 0;
  };
  return headX;
}

function make(n, v) {
  if (n <= 0) {
    return /* [] */0;
  }
  var headX = {
    hd: v,
    tl: /* [] */0
  };
  var cur = headX;
  var i = 1;
  while(i < n) {
    var v$1 = {
      hd: v,
      tl: /* [] */0
    };
    cur.tl = v$1;
    cur = v$1;
    i = i + 1 | 0;
  };
  return headX;
}

function length(xs) {
  var _x = xs;
  var _acc = 0;
  while(true) {
    var acc = _acc;
    var x = _x;
    if (!x) {
      return acc;
    }
    _acc = acc + 1 | 0;
    _x = x.tl;
    continue ;
  };
}

function fillAux(arr, _i, _x) {
  while(true) {
    var x = _x;
    var i = _i;
    if (!x) {
      return ;
    }
    arr[i] = x.hd;
    _x = x.tl;
    _i = i + 1 | 0;
    continue ;
  };
}

function fromArray(a) {
  var _i = a.length - 1 | 0;
  var _res = /* [] */0;
  while(true) {
    var res = _res;
    var i = _i;
    if (i < 0) {
      return res;
    }
    _res = {
      hd: a[i],
      tl: res
    };
    _i = i - 1 | 0;
    continue ;
  };
}

function toArray(x) {
  var len = length(x);
  var arr = new Array(len);
  fillAux(arr, 0, x);
  return arr;
}

function toShuffled(xs) {
  var v = toArray(xs);
  Core__Array.shuffle(v);
  return fromArray(v);
}

function reverseConcat(_l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (!l1) {
      return l2;
    }
    _l2 = {
      hd: l1.hd,
      tl: l2
    };
    _l1 = l1.tl;
    continue ;
  };
}

function reverse(l) {
  return reverseConcat(l, /* [] */0);
}

function flatAux(_prec, _xs) {
  while(true) {
    var xs = _xs;
    var prec = _prec;
    if (xs) {
      _xs = xs.tl;
      _prec = copyAuxCont(xs.hd, prec);
      continue ;
    }
    prec.tl = /* [] */0;
    return ;
  };
}

function flat(_xs) {
  while(true) {
    var xs = _xs;
    if (!xs) {
      return /* [] */0;
    }
    var match = xs.hd;
    if (match) {
      var cell = {
        hd: match.hd,
        tl: /* [] */0
      };
      flatAux(copyAuxCont(match.tl, cell), xs.tl);
      return cell;
    }
    _xs = xs.tl;
    continue ;
  };
}

function concatMany(xs) {
  var len = xs.length;
  if (len === 1) {
    return xs[0];
  }
  if (len === 0) {
    return /* [] */0;
  }
  var len$1 = xs.length;
  var v = xs[len$1 - 1 | 0];
  for(var i = len$1 - 2 | 0; i >= 0; --i){
    v = concat(xs[i], v);
  }
  return v;
}

function mapReverse(l, f) {
  var _accu = /* [] */0;
  var _xs = l;
  while(true) {
    var xs = _xs;
    var accu = _accu;
    if (!xs) {
      return accu;
    }
    _xs = xs.tl;
    _accu = {
      hd: f(xs.hd),
      tl: accu
    };
    continue ;
  };
}

function forEach(_xs, f) {
  while(true) {
    var xs = _xs;
    if (!xs) {
      return ;
    }
    f(xs.hd);
    _xs = xs.tl;
    continue ;
  };
}

function forEachWithIndex(l, f) {
  var _xs = l;
  var _i = 0;
  while(true) {
    var i = _i;
    var xs = _xs;
    if (!xs) {
      return ;
    }
    f(xs.hd, i);
    _i = i + 1 | 0;
    _xs = xs.tl;
    continue ;
  };
}

function reduce(_l, _accu, f) {
  while(true) {
    var accu = _accu;
    var l = _l;
    if (!l) {
      return accu;
    }
    _accu = f(accu, l.hd);
    _l = l.tl;
    continue ;
  };
}

function reduceReverseUnsafe(l, accu, f) {
  if (l) {
    return f(reduceReverseUnsafe(l.tl, accu, f), l.hd);
  } else {
    return accu;
  }
}

function reduceReverse(l, acc, f) {
  var len = length(l);
  if (len < 1000) {
    return reduceReverseUnsafe(l, acc, f);
  } else {
    var a = toArray(l);
    var r = acc;
    for(var i = a.length - 1 | 0; i >= 0; --i){
      r = f(r, a[i]);
    }
    return r;
  }
}

function reduceWithIndex(l, acc, f) {
  var _l = l;
  var _acc = acc;
  var _i = 0;
  while(true) {
    var i = _i;
    var acc$1 = _acc;
    var l$1 = _l;
    if (!l$1) {
      return acc$1;
    }
    _i = i + 1 | 0;
    _acc = f(acc$1, l$1.hd, i);
    _l = l$1.tl;
    continue ;
  };
}

function mapReverse2(l1, l2, f) {
  var _l1 = l1;
  var _l2 = l2;
  var _accu = /* [] */0;
  while(true) {
    var accu = _accu;
    var l2$1 = _l2;
    var l1$1 = _l1;
    if (!l1$1) {
      return accu;
    }
    if (!l2$1) {
      return accu;
    }
    _accu = {
      hd: f(l1$1.hd, l2$1.hd),
      tl: accu
    };
    _l2 = l2$1.tl;
    _l1 = l1$1.tl;
    continue ;
  };
}

function forEach2(_l1, _l2, f) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (!l1) {
      return ;
    }
    if (!l2) {
      return ;
    }
    f(l1.hd, l2.hd);
    _l2 = l2.tl;
    _l1 = l1.tl;
    continue ;
  };
}

function reduce2(_l1, _l2, _accu, f) {
  while(true) {
    var accu = _accu;
    var l2 = _l2;
    var l1 = _l1;
    if (!l1) {
      return accu;
    }
    if (!l2) {
      return accu;
    }
    _accu = f(accu, l1.hd, l2.hd);
    _l2 = l2.tl;
    _l1 = l1.tl;
    continue ;
  };
}

function reduceReverse2Unsafe(l1, l2, accu, f) {
  if (l1 && l2) {
    return f(reduceReverse2Unsafe(l1.tl, l2.tl, accu, f), l1.hd, l2.hd);
  } else {
    return accu;
  }
}

function reduceReverse2(l1, l2, acc, f) {
  var len = length(l1);
  if (len < 1000) {
    return reduceReverse2Unsafe(l1, l2, acc, f);
  } else {
    var a = toArray(l1);
    var b = toArray(l2);
    var r = acc;
    var len$1 = a.length < b.length ? a.length : b.length;
    for(var i = len$1 - 1 | 0; i >= 0; --i){
      r = f(r, a[i], b[i]);
    }
    return r;
  }
}

function every(_xs, p) {
  while(true) {
    var xs = _xs;
    if (!xs) {
      return true;
    }
    if (!p(xs.hd)) {
      return false;
    }
    _xs = xs.tl;
    continue ;
  };
}

function some(_xs, p) {
  while(true) {
    var xs = _xs;
    if (!xs) {
      return false;
    }
    if (p(xs.hd)) {
      return true;
    }
    _xs = xs.tl;
    continue ;
  };
}

function every2(_l1, _l2, p) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (!l1) {
      return true;
    }
    if (!l2) {
      return true;
    }
    if (!p(l1.hd, l2.hd)) {
      return false;
    }
    _l2 = l2.tl;
    _l1 = l1.tl;
    continue ;
  };
}

function compareLength(_l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (!l1) {
      if (l2) {
        return -1;
      } else {
        return 0;
      }
    }
    if (!l2) {
      return 1;
    }
    _l2 = l2.tl;
    _l1 = l1.tl;
    continue ;
  };
}

function compare(_l1, _l2, p) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (!l1) {
      if (l2) {
        return -1;
      } else {
        return 0;
      }
    }
    if (!l2) {
      return 1;
    }
    var c = p(l1.hd, l2.hd);
    if (c !== 0) {
      return c;
    }
    _l2 = l2.tl;
    _l1 = l1.tl;
    continue ;
  };
}

function equal(_l1, _l2, p) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (!l1) {
      if (l2) {
        return false;
      } else {
        return true;
      }
    }
    if (!l2) {
      return false;
    }
    if (!p(l1.hd, l2.hd)) {
      return false;
    }
    _l2 = l2.tl;
    _l1 = l1.tl;
    continue ;
  };
}

function some2(_l1, _l2, p) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (!l1) {
      return false;
    }
    if (!l2) {
      return false;
    }
    if (p(l1.hd, l2.hd)) {
      return true;
    }
    _l2 = l2.tl;
    _l1 = l1.tl;
    continue ;
  };
}

function has(_xs, x, eq) {
  while(true) {
    var xs = _xs;
    if (!xs) {
      return false;
    }
    if (eq(xs.hd, x)) {
      return true;
    }
    _xs = xs.tl;
    continue ;
  };
}

function getAssoc(_xs, x, eq) {
  while(true) {
    var xs = _xs;
    if (!xs) {
      return ;
    }
    var match = xs.hd;
    if (eq(match[0], x)) {
      return Caml_option.some(match[1]);
    }
    _xs = xs.tl;
    continue ;
  };
}

function hasAssoc(_xs, x, eq) {
  while(true) {
    var xs = _xs;
    if (!xs) {
      return false;
    }
    if (eq(xs.hd[0], x)) {
      return true;
    }
    _xs = xs.tl;
    continue ;
  };
}

function removeAssoc(xs, x, eq) {
  if (!xs) {
    return /* [] */0;
  }
  var l = xs.tl;
  var pair = xs.hd;
  if (eq(pair[0], x)) {
    return l;
  }
  var cell = {
    hd: pair,
    tl: /* [] */0
  };
  var removed = removeAssocAuxWithMap(l, x, cell, eq);
  if (removed) {
    return cell;
  } else {
    return xs;
  }
}

function setAssoc(xs, x, k, eq) {
  if (!xs) {
    return {
            hd: [
              x,
              k
            ],
            tl: /* [] */0
          };
  }
  var l = xs.tl;
  var pair = xs.hd;
  if (eq(pair[0], x)) {
    return {
            hd: [
              x,
              k
            ],
            tl: l
          };
  }
  var cell = {
    hd: pair,
    tl: /* [] */0
  };
  var replaced = setAssocAuxWithMap(l, x, k, cell, eq);
  if (replaced) {
    return cell;
  } else {
    return {
            hd: [
              x,
              k
            ],
            tl: xs
          };
  }
}

function sort(xs, cmp) {
  var arr = toArray(xs);
  arr.sort(cmp);
  return fromArray(arr);
}

function find(_xs, p) {
  while(true) {
    var xs = _xs;
    if (!xs) {
      return ;
    }
    var x = xs.hd;
    if (p(x)) {
      return Caml_option.some(x);
    }
    _xs = xs.tl;
    continue ;
  };
}

function filter(_xs, p) {
  while(true) {
    var xs = _xs;
    if (!xs) {
      return /* [] */0;
    }
    var t = xs.tl;
    var h = xs.hd;
    if (p(h)) {
      var cell = {
        hd: h,
        tl: /* [] */0
      };
      copyAuxWitFilter(p, t, cell);
      return cell;
    }
    _xs = t;
    continue ;
  };
}

function filterWithIndex(xs, p) {
  var _xs = xs;
  var _i = 0;
  while(true) {
    var i = _i;
    var xs$1 = _xs;
    if (!xs$1) {
      return /* [] */0;
    }
    var t = xs$1.tl;
    var h = xs$1.hd;
    if (p(h, i)) {
      var cell = {
        hd: h,
        tl: /* [] */0
      };
      copyAuxWithFilterIndex(p, t, cell, i + 1 | 0);
      return cell;
    }
    _i = i + 1 | 0;
    _xs = t;
    continue ;
  };
}

function filterMap(_xs, p) {
  while(true) {
    var xs = _xs;
    if (!xs) {
      return /* [] */0;
    }
    var t = xs.tl;
    var h = p(xs.hd);
    if (h !== undefined) {
      var cell = {
        hd: Caml_option.valFromOption(h),
        tl: /* [] */0
      };
      copyAuxWitFilterMap(p, t, cell);
      return cell;
    }
    _xs = t;
    continue ;
  };
}

function partition(l, p) {
  if (!l) {
    return [
            /* [] */0,
            /* [] */0
          ];
  }
  var h = l.hd;
  var nextX = {
    hd: h,
    tl: /* [] */0
  };
  var nextY = {
    hd: h,
    tl: /* [] */0
  };
  var b = p(h);
  partitionAux(p, l.tl, nextX, nextY);
  if (b) {
    return [
            nextX,
            nextY.tl
          ];
  } else {
    return [
            nextX.tl,
            nextY
          ];
  }
}

function unzip(xs) {
  if (!xs) {
    return [
            /* [] */0,
            /* [] */0
          ];
  }
  var match = xs.hd;
  var cellX = {
    hd: match[0],
    tl: /* [] */0
  };
  var cellY = {
    hd: match[1],
    tl: /* [] */0
  };
  splitAux(xs.tl, cellX, cellY);
  return [
          cellX,
          cellY
        ];
}

function zip(l1, l2) {
  if (!l1) {
    return /* [] */0;
  }
  if (!l2) {
    return /* [] */0;
  }
  var cell = {
    hd: [
      l1.hd,
      l2.hd
    ],
    tl: /* [] */0
  };
  zipAux(l1.tl, l2.tl, cell);
  return cell;
}

var size = length;

export {
  length ,
  size ,
  head ,
  headExn ,
  tail ,
  tailExn ,
  add ,
  get ,
  getExn ,
  make ,
  fromInitializer ,
  toShuffled ,
  drop ,
  take ,
  splitAt ,
  concat ,
  concatMany ,
  reverseConcat ,
  flat ,
  map ,
  zip ,
  zipBy ,
  mapWithIndex ,
  fromArray ,
  toArray ,
  reverse ,
  mapReverse ,
  forEach ,
  forEachWithIndex ,
  reduce ,
  reduceWithIndex ,
  reduceReverse ,
  mapReverse2 ,
  forEach2 ,
  reduce2 ,
  reduceReverse2 ,
  every ,
  some ,
  every2 ,
  some2 ,
  compareLength ,
  compare ,
  equal ,
  has ,
  find ,
  filter ,
  filterWithIndex ,
  filterMap ,
  partition ,
  unzip ,
  getAssoc ,
  hasAssoc ,
  removeAssoc ,
  setAssoc ,
  sort ,
}
/* No side effect */
