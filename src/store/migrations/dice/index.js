export default (state) => {
  const {
    app: { dice, ...app },
  } = state;

  if (dice) {
    return {
      ...state,
      app,
      dice,
    };
  }

  return state;
};
