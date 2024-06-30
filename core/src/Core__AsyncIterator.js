


async function forEach(iterator, f) {
  var iteratorDone = false;
  while(!iteratorDone) {
    var match = await iterator.next();
    f(match.value);
    iteratorDone = match.done;
  };
}

export {
  forEach ,
}
/* No side effect */
