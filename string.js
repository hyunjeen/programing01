const recursive = (iter, node) => {
  const { done, value } = iter.next();
  if (!done) {
  } else {
  }
};

function* objectIter(obj) {
  for (const key of obj) {
    if (obj.hasOwnProperty(key)) {
      yield [key, obj[key]];
    }
  }
}

const stringfy = (iter) => {
  return recursive(
    Array.isArray(iter) ? iter[Symbol.iterator]() : objectIter(iter),
    { prev: null, isObject: !Array.isArray(iter), element: null }
  );
};

console.log(stringfy([1, 2, 3, 4]));
