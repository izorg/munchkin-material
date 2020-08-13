export default (state) => {
  const { app, ...rest } = state;

  if (app !== undefined) {
    return {
      ...rest,
      settings: app,
    };
  }

  return state;
};
