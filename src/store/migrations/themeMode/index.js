export default (state) => {
  const {
    theme: { type, ...theme },
  } = state;

  if (type) {
    return {
      ...state,
      theme: {
        ...theme,
        mode: type,
      },
    };
  }

  return state;
};
