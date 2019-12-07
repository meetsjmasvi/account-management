export const deepCopy = function () {
  return JSON.parse(JSON.stringify(Object.assign({}, ...arguments)));
};