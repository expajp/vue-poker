import deepcopyArray from "./deepcopyArray";

export default arr => [...new Set(deepcopyArray(arr))]
