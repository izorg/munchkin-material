export default (state) => {
  const { playerColors, players, ...rest } = state;

  if (playerColors) {
    const playersWithColor = Object.keys(players).reduce((accumulator, id) => {
      if (playerColors[id]) {
        return {
          ...accumulator,
          [id]: {
            ...players[id],
            color: playerColors[id],
          },
        };
      }

      return {
        ...accumulator,
        [id]: players[id],
      };
    }, {});

    return {
      ...rest,
      players: playersWithColor,
    };
  }

  return state;
};
