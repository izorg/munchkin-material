export default (state) => {
  const { theme } = state;

  if (theme.pureBlack === undefined) {
    return {
      ...state,
      theme: {
        ...theme,
        pureBlack: false,
      },
    };
  }

  return state;
};
