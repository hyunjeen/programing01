const elToString = (v) => "" + v;
const arrToString = (acc) => {
  let arrToStr = "";
  do {
    arrToStr = "," + acc.element + arrToStr;
  } while ((acc = acc.prevAcc));

  arrToStr = arrToStr.substring(1);
  return `[${arrToStr}]`;
};
const recursive = (arr, acc, idx, deps) => {
  if (idx < arr.length) {
    if (Array.isArray(arr[idx])) {
      deps = { prev: deps, prevArr: arr, prevAcc: acc, prevIdx: idx + 1 };
      return recursive(arr[idx], null, 0, deps);
    } else {
      acc = { prevAcc: acc, element: elToString(arr[idx]) };
      return recursive(arr, acc, idx + 1, deps);
    }
  } else {
    const arrToStr = arrToString(acc);
    if (deps) {
      const { prev, prevArr, prevAcc, prevIdx } = deps;
      acc = { prevAcc: prevAcc, element: arrToStr };
      return recursive(prevArr, acc, prevIdx, prev);
    }
    return arrToStr;
  }
};

const stringfy = (arr) => {
  return recursive(arr, null, 0, null);
};

console.log(stringfy([1, 2, [3, [1, 2, [1, 2, 3, 4], 3, 4], 4], 5, 7]));
