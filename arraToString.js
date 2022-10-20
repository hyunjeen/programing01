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
      return recursive(arr[idx], null, 0, {
        prev: deps,
        prevArr: arr,
        prevAcc: acc,
        prevIdx: idx + 1,
      });
    } else {
      return recursive(
        arr,
        { prevAcc: acc, element: elToString(arr[idx]) },
        idx + 1,
        deps
      );
    }
  } else {
    const arrToStr = arrToString(acc);
    if (deps) {
      const { prev, prevArr, prevAcc, prevIdx } = deps;
      return recursive(
        prevArr,
        { prevAcc: prevAcc, element: arrToStr },
        prevIdx,
        prev
      );
    }
    return arrToStr;
  }
};

const stringfy = (arr) => {
  return recursive(arr, null, 0, null);
};

console.log(stringfy([1, 2, [3, [1, 2, [1, 2, 3, 4], 3, 4], 4], 5, 7]));
