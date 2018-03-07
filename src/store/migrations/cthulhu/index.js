export default (state) => {
  const { app } = state;

  if (app.theme === 'chtulhu') {
    return {
      ...state,
      app: {
        ...app,
        theme: 'cthulhu',
      },
    };
  }

  return state;
};
