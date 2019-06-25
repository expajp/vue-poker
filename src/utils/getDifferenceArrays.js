import deepcopyArray from "./deepcopyArray.js";

export default (arr1, arr2) => {
  let ret = deepcopyArray(arr1);
  arr2.forEach(item => {
    if (ret.indexOf(item) >= 0) ret.splice(ret.indexOf(item), 1);
  });
  return ret;
};
