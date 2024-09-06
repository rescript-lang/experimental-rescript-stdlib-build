

import * as Caml from "rescript/lib/es6/caml.js";
import * as Caml_int32 from "rescript/lib/es6/caml_int32.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";

function get(arr, i) {
  if (i >= 0 && i < arr.length) {
    return Caml_option.some(arr[i]);
  }
  
}

function getExn(arr, i) {
  if (!(i >= 0 && i < arr.length)) {
    throw new Error("Assert_failure", {
      cause: {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "belt_Array.res",
          36,
          2
        ]
      }
    });
  }
  return arr[i];
}

function set(arr, i, v) {
  if (i >= 0 && i < arr.length) {
    arr[i] = v;
    return true;
  } else {
    return false;
  }
}

function setExn(arr, i, v) {
  if (!(i >= 0 && i < arr.length)) {
    throw new Error("Assert_failure", {
      cause: {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "belt_Array.res",
          49,
          2
        ]
      }
    });
  }
  arr[i] = v;
}

function swapUnsafe(xs, i, j) {
  let tmp = xs[i];
  xs[i] = xs[j];
  xs[j] = tmp;
}

function shuffleInPlace(xs) {
  let len = xs.length;
  let random_int = (min, max) => Math.floor(Math.random() * (max - min | 0)) + min | 0;
  for (let i = 0; i < len; ++i) {
    swapUnsafe(xs, i, random_int(i, len));
  }
}

function shuffle(xs) {
  let result = xs.slice(0);
  shuffleInPlace(result);
  return result;
}

function reverseInPlace(xs) {
  let len = xs.length;
  let ofs = 0;
  for (let i = 0, i_finish = len / 2 | 0; i < i_finish; ++i) {
    swapUnsafe(xs, ofs + i | 0, ((ofs + len | 0) - i | 0) - 1 | 0);
  }
}

function reverse(xs) {
  let len = xs.length;
  let result = new Array(len);
  for (let i = 0; i < len; ++i) {
    result[i] = xs[(len - 1 | 0) - i | 0];
  }
  return result;
}

function make(l, f) {
  if (l <= 0) {
    return [];
  }
  let res = new Array(l);
  for (let i = 0; i < l; ++i) {
    res[i] = f;
  }
  return res;
}

function makeBy(l, f) {
  if (l <= 0) {
    return [];
  }
  let res = new Array(l);
  for (let i = 0; i < l; ++i) {
    res[i] = f(i);
  }
  return res;
}

function makeByAndShuffle(l, f) {
  let u = makeBy(l, f);
  shuffleInPlace(u);
  return u;
}

function range(start, finish) {
  let cut = finish - start | 0;
  if (cut < 0) {
    return [];
  }
  let arr = new Array(cut + 1 | 0);
  for (let i = 0; i <= cut; ++i) {
    arr[i] = start + i | 0;
  }
  return arr;
}

function rangeBy(start, finish, step) {
  let cut = finish - start | 0;
  if (cut < 0 || step <= 0) {
    return [];
  }
  let nb = Caml_int32.div(cut, step) + 1 | 0;
  let arr = new Array(nb);
  let cur = start;
  for (let i = 0; i < nb; ++i) {
    arr[i] = cur;
    cur = cur + step | 0;
  }
  return arr;
}

function zip(xs, ys) {
  let lenx = xs.length;
  let leny = ys.length;
  let len = lenx < leny ? lenx : leny;
  let s = new Array(len);
  for (let i = 0; i < len; ++i) {
    s[i] = [
      xs[i],
      ys[i]
    ];
  }
  return s;
}

function zipBy(xs, ys, f) {
  let lenx = xs.length;
  let leny = ys.length;
  let len = lenx < leny ? lenx : leny;
  let s = new Array(len);
  for (let i = 0; i < len; ++i) {
    s[i] = f(xs[i], ys[i]);
  }
  return s;
}

function concat(a1, a2) {
  let l1 = a1.length;
  let l2 = a2.length;
  let a1a2 = new Array(l1 + l2 | 0);
  for (let i = 0; i < l1; ++i) {
    a1a2[i] = a1[i];
  }
  for (let i$1 = 0; i$1 < l2; ++i$1) {
    a1a2[l1 + i$1 | 0] = a2[i$1];
  }
  return a1a2;
}

function concatMany(arrs) {
  let lenArrs = arrs.length;
  let totalLen = 0;
  for (let i = 0; i < lenArrs; ++i) {
    totalLen = totalLen + arrs[i].length | 0;
  }
  let result = new Array(totalLen);
  totalLen = 0;
  for (let j = 0; j < lenArrs; ++j) {
    let cur = arrs[j];
    for (let k = 0, k_finish = cur.length; k < k_finish; ++k) {
      result[totalLen] = cur[k];
      totalLen = totalLen + 1 | 0;
    }
  }
  return result;
}

function slice(a, offset, len) {
  if (len <= 0) {
    return [];
  }
  let lena = a.length;
  let ofs = offset < 0 ? Caml.int_max(lena + offset | 0, 0) : offset;
  let hasLen = lena - ofs | 0;
  let copyLength = hasLen < len ? hasLen : len;
  if (copyLength <= 0) {
    return [];
  }
  let result = new Array(copyLength);
  for (let i = 0; i < copyLength; ++i) {
    result[i] = a[ofs + i | 0];
  }
  return result;
}

function sliceToEnd(a, offset) {
  let lena = a.length;
  let ofs = offset < 0 ? Caml.int_max(lena + offset | 0, 0) : offset;
  let len = lena > ofs ? lena - ofs | 0 : 0;
  let result = new Array(len);
  for (let i = 0; i < len; ++i) {
    result[i] = a[ofs + i | 0];
  }
  return result;
}

function fill(a, offset, len, v) {
  if (len <= 0) {
    return;
  }
  let lena = a.length;
  let ofs = offset < 0 ? Caml.int_max(lena + offset | 0, 0) : offset;
  let hasLen = lena - ofs | 0;
  let fillLength = hasLen < len ? hasLen : len;
  if (fillLength <= 0) {
    return;
  }
  for (let i = ofs, i_finish = ofs + fillLength | 0; i < i_finish; ++i) {
    a[i] = v;
  }
}

function blitUnsafe(a1, srcofs1, a2, srcofs2, blitLength) {
  if (srcofs2 <= srcofs1) {
    for (let j = 0; j < blitLength; ++j) {
      a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
    }
    return;
  }
  for (let j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1) {
    a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
  }
}

function blit(a1, ofs1, a2, ofs2, len) {
  let lena1 = a1.length;
  let lena2 = a2.length;
  let srcofs1 = ofs1 < 0 ? Caml.int_max(lena1 + ofs1 | 0, 0) : ofs1;
  let srcofs2 = ofs2 < 0 ? Caml.int_max(lena2 + ofs2 | 0, 0) : ofs2;
  let blitLength = Caml.int_min(len, Caml.int_min(lena1 - srcofs1 | 0, lena2 - srcofs2 | 0));
  if (srcofs2 <= srcofs1) {
    for (let j = 0; j < blitLength; ++j) {
      a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
    }
    return;
  }
  for (let j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1) {
    a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
  }
}

function forEach(a, f) {
  for (let i = 0, i_finish = a.length; i < i_finish; ++i) {
    f(a[i]);
  }
}

function map(a, f) {
  let l = a.length;
  let r = new Array(l);
  for (let i = 0; i < l; ++i) {
    r[i] = f(a[i]);
  }
  return r;
}

function flatMap(a, f) {
  return concatMany(map(a, f));
}

function getBy(a, p) {
  let l = a.length;
  let i = 0;
  let r;
  while (r === undefined && i < l) {
    let v = a[i];
    if (p(v)) {
      r = Caml_option.some(v);
    }
    i = i + 1 | 0;
  };
  return r;
}

function getIndexBy(a, p) {
  let l = a.length;
  let i = 0;
  let r;
  while (r === undefined && i < l) {
    let v = a[i];
    if (p(v)) {
      r = i;
    }
    i = i + 1 | 0;
  };
  return r;
}

function keep(a, f) {
  let l = a.length;
  let r = new Array(l);
  let j = 0;
  for (let i = 0; i < l; ++i) {
    let v = a[i];
    if (f(v)) {
      r[j] = v;
      j = j + 1 | 0;
    }
    
  }
  r.length = j;
  return r;
}

function keepWithIndex(a, f) {
  let l = a.length;
  let r = new Array(l);
  let j = 0;
  for (let i = 0; i < l; ++i) {
    let v = a[i];
    if (f(v, i)) {
      r[j] = v;
      j = j + 1 | 0;
    }
    
  }
  r.length = j;
  return r;
}

function keepMap(a, f) {
  let l = a.length;
  let r = new Array(l);
  let j = 0;
  for (let i = 0; i < l; ++i) {
    let v = a[i];
    let v$1 = f(v);
    if (v$1 !== undefined) {
      r[j] = Caml_option.valFromOption(v$1);
      j = j + 1 | 0;
    }
    
  }
  r.length = j;
  return r;
}

function forEachWithIndex(a, f) {
  for (let i = 0, i_finish = a.length; i < i_finish; ++i) {
    f(i, a[i]);
  }
}

function mapWithIndex(a, f) {
  let l = a.length;
  let r = new Array(l);
  for (let i = 0; i < l; ++i) {
    r[i] = f(i, a[i]);
  }
  return r;
}

function reduce(a, x, f) {
  let r = x;
  for (let i = 0, i_finish = a.length; i < i_finish; ++i) {
    r = f(r, a[i]);
  }
  return r;
}

function reduceReverse(a, x, f) {
  let r = x;
  for (let i = a.length - 1 | 0; i >= 0; --i) {
    r = f(r, a[i]);
  }
  return r;
}

function reduceReverse2(a, b, x, f) {
  let r = x;
  let len = Caml.int_min(a.length, b.length);
  for (let i = len - 1 | 0; i >= 0; --i) {
    r = f(r, a[i], b[i]);
  }
  return r;
}

function reduceWithIndex(a, x, f) {
  let r = x;
  for (let i = 0, i_finish = a.length; i < i_finish; ++i) {
    r = f(r, a[i], i);
  }
  return r;
}

function every(arr, b) {
  let len = arr.length;
  let _i = 0;
  while (true) {
    let i = _i;
    if (i === len) {
      return true;
    }
    if (!b(arr[i])) {
      return false;
    }
    _i = i + 1 | 0;
    continue;
  };
}

function some(arr, b) {
  let len = arr.length;
  let _i = 0;
  while (true) {
    let i = _i;
    if (i === len) {
      return false;
    }
    if (b(arr[i])) {
      return true;
    }
    _i = i + 1 | 0;
    continue;
  };
}

function everyAux2(arr1, arr2, _i, b, len) {
  while (true) {
    let i = _i;
    if (i === len) {
      return true;
    }
    if (!b(arr1[i], arr2[i])) {
      return false;
    }
    _i = i + 1 | 0;
    continue;
  };
}

function every2(a, b, p) {
  return everyAux2(a, b, 0, p, Caml.int_min(a.length, b.length));
}

function some2(a, b, p) {
  let _i = 0;
  let len = Caml.int_min(a.length, b.length);
  while (true) {
    let i = _i;
    if (i === len) {
      return false;
    }
    if (p(a[i], b[i])) {
      return true;
    }
    _i = i + 1 | 0;
    continue;
  };
}

function eq(a, b, p) {
  let lena = a.length;
  let lenb = b.length;
  if (lena === lenb) {
    return everyAux2(a, b, 0, p, lena);
  } else {
    return false;
  }
}

function cmp(a, b, p) {
  let lena = a.length;
  let lenb = b.length;
  if (lena > lenb) {
    return 1;
  } else if (lena < lenb) {
    return -1;
  } else {
    let _i = 0;
    while (true) {
      let i = _i;
      if (i === lena) {
        return 0;
      }
      let c = p(a[i], b[i]);
      if (c !== 0) {
        return c;
      }
      _i = i + 1 | 0;
      continue;
    };
  }
}

function partition(a, f) {
  let l = a.length;
  let i = 0;
  let j = 0;
  let a1 = new Array(l);
  let a2 = new Array(l);
  for (let ii = 0; ii < l; ++ii) {
    let v = a[ii];
    if (f(v)) {
      a1[i] = v;
      i = i + 1 | 0;
    } else {
      a2[j] = v;
      j = j + 1 | 0;
    }
  }
  a1.length = i;
  a2.length = j;
  return [
    a1,
    a2
  ];
}

function unzip(a) {
  let l = a.length;
  let a1 = new Array(l);
  let a2 = new Array(l);
  for (let i = 0; i < l; ++i) {
    let match = a[i];
    a1[i] = match[0];
    a2[i] = match[1];
  }
  return [
    a1,
    a2
  ];
}

function joinWith(a, sep, toString) {
  let l = a.length;
  if (l === 0) {
    return "";
  }
  let lastIndex = l - 1 | 0;
  let _i = 0;
  let _res = "";
  while (true) {
    let res = _res;
    let i = _i;
    if (i === lastIndex) {
      return res + toString(a[i]);
    }
    _res = res + (toString(a[i]) + sep);
    _i = i + 1 | 0;
    continue;
  };
}

function init(n, f) {
  let v = new Array(n);
  for (let i = 0; i < n; ++i) {
    v[i] = f(i);
  }
  return v;
}

let makeByU = makeBy;

let makeByAndShuffleU = makeByAndShuffle;

let zipByU = zipBy;

let forEachU = forEach;

let mapU = map;

let flatMapU = flatMap;

let getByU = getBy;

let getIndexByU = getIndexBy;

let keepU = keep;

let keepWithIndexU = keepWithIndex;

let keepMapU = keepMap;

let forEachWithIndexU = forEachWithIndex;

let mapWithIndexU = mapWithIndex;

let partitionU = partition;

let reduceU = reduce;

let reduceReverseU = reduceReverse;

let reduceReverse2U = reduceReverse2;

let reduceWithIndexU = reduceWithIndex;

let joinWithU = joinWith;

let someU = some;

let everyU = every;

let every2U = every2;

let some2U = some2;

let cmpU = cmp;

let eqU = eq;

let initU = init;

export {
  get,
  getExn,
  set,
  setExn,
  shuffleInPlace,
  shuffle,
  reverseInPlace,
  reverse,
  make,
  range,
  rangeBy,
  makeByU,
  makeBy,
  makeByAndShuffleU,
  makeByAndShuffle,
  zip,
  zipByU,
  zipBy,
  unzip,
  concat,
  concatMany,
  slice,
  sliceToEnd,
  fill,
  blit,
  blitUnsafe,
  forEachU,
  forEach,
  mapU,
  map,
  flatMapU,
  flatMap,
  getByU,
  getBy,
  getIndexByU,
  getIndexBy,
  keepU,
  keep,
  keepWithIndexU,
  keepWithIndex,
  keepMapU,
  keepMap,
  forEachWithIndexU,
  forEachWithIndex,
  mapWithIndexU,
  mapWithIndex,
  partitionU,
  partition,
  reduceU,
  reduce,
  reduceReverseU,
  reduceReverse,
  reduceReverse2U,
  reduceReverse2,
  reduceWithIndexU,
  reduceWithIndex,
  joinWithU,
  joinWith,
  someU,
  some,
  everyU,
  every,
  every2U,
  every2,
  some2U,
  some2,
  cmpU,
  cmp,
  eqU,
  eq,
  initU,
  init,
}
/* No side effect */
