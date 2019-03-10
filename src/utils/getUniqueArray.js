import deepcopyArray from "./deepcopyArray";

export default (arr) => {
    return [...new Set(deepcopyArray(arr))]
}
