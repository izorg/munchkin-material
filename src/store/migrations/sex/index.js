export default (state) => {
  const { players } = state;

  Object.keys(players).forEach((id) => {
    const { gender, ...player } = players[id];

    if (gender) {
      players[id] = {
        ...player,
        sex: gender,
      };
    }
  });

  return {
    ...state,
    players,
  };
};
