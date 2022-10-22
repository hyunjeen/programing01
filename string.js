const elToString = (v) => "" + v;

function transfer(acc, isObject) {
  let result = "";
  const [START, END] = isObject ? "{}" : "[]";
  console.log(acc);
  do {
    result =
      "," +
      (isObject
        ? `${elToString(acc.value[0])}:${elToString(acc.value[1])}`
        : elToString(acc.value)) +
      result;
  } while ((acc = acc.prevNode));
  result = result.substring(1);
  return START + result + END;
}

const recursive = (target, isObject, acc, deps) => {
  const { done, value } = target.next();
  if (!done) {
    const v = isObject ? value[1] : value;
    switch (true) {
      case Array.isArray(v): {
        return recursive(v[Symbol.iterator](), false, null, {
          prevTarget: target,
          prevIsObject: isObject,
          prevAcc: acc,
          prevDeps: deps,
          key: isObject ? value[0] : null,
        });
      }
      case typeof v === "object": {
        return recursive(objectIter(v), true, null, {
          prevTarget: target,
          prevIsObject: isObject,
          prevAcc: acc,
          prevDeps: deps,
          key: isObject ? value[0] : null,
        });
      }
      default: {
        return recursive(
          target,
          isObject,
          {
            prevNode: acc,
            value: isObject ? value : v,
          },
          deps
        );
      }
    }
  } else {
    const result = transfer(acc, isObject);
    if (deps) {
      const { prevTarget, prevIsObject, prevAcc, prevDeps, key } = deps;
      return recursive(
        prevTarget,
        prevIsObject,
        {
          prevNode: prevAcc,
          value: key ? [key, result] : result,
        },
        prevDeps
      );
    } else {
      return result;
    }
  }
};

function* objectIter(target) {
  for (const targetKey in target) {
    if (target.hasOwnProperty(targetKey)) {
      yield [targetKey, target[targetKey]];
    }
  }
}

const stringfy = (target) => {
  return recursive(
    Array.isArray(target) ? target[Symbol.iterator]() : objectIter(target),
    !Array.isArray(target),
    null,
    null
  );
};

console.log(
  stringfy([
    1,
    2,
    { a: { b: { c: { d: 1 } } } },
    [4, [1, [2]]],
    { a: [1], b: { a: { c: 2 } } },
    5,
    6,
  ])
);
