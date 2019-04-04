export default (state) => {
  const {
    app: { menuCollapsed, ...app },
  } = state;

  if (menuCollapsed === undefined) {
    return {
      ...state,
      app: {
        ...app,
        menuCollapsed: true,
      },
    };
  }

  return state;
};
