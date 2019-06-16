export default (state) => {
  const { versions, ...rest } = state;

  if (versions) {
    return rest;
  }

  return state;
};
