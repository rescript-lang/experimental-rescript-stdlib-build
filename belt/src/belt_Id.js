


function MakeComparableU(M) {
  return M;
}

function MakeComparable(M) {
  var cmp = M.cmp;
  var cmp$1 = function (a, b) {
    return cmp(a, b);
  };
  return {
          cmp: cmp$1
        };
}

function comparableU(cmp) {
  return {
          cmp: cmp
        };
}

function comparable(cmp) {
  var cmp$1 = function (a, b) {
    return cmp(a, b);
  };
  return {
          cmp: cmp$1
        };
}

function MakeHashableU(M) {
  return M;
}

function MakeHashable(M) {
  var hash = M.hash;
  var hash$1 = function (a) {
    return hash(a);
  };
  var eq = M.eq;
  var eq$1 = function (a, b) {
    return eq(a, b);
  };
  return {
          hash: hash$1,
          eq: eq$1
        };
}

function hashableU(hash, eq) {
  return {
          hash: hash,
          eq: eq
        };
}

function hashable(hash, eq) {
  var hash$1 = function (a) {
    return hash(a);
  };
  var eq$1 = function (a, b) {
    return eq(a, b);
  };
  return {
          hash: hash$1,
          eq: eq$1
        };
}

export {
  MakeComparableU ,
  MakeComparable ,
  comparableU ,
  comparable ,
  MakeHashableU ,
  MakeHashable ,
  hashableU ,
  hashable ,
}
/* No side effect */
