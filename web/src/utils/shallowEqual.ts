const shallowEqual = (
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>
) =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every(
    (key) =>
      Object.prototype.hasOwnProperty.call(obj2, key) && obj1[key] === obj2[key]
  );

export default shallowEqual;
