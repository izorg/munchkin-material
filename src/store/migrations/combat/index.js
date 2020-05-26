export default (state) => {
  const {
    app: { combatFinished, ...app },
    combat,
  } = state;

  if (combatFinished !== undefined) {
    return {
      ...state,
      app,
      combat: {
        ...combat,
        finished: combatFinished,
      },
    };
  }

  return state;
};
