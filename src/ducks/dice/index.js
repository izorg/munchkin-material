export const THROW_DICE = 'dice/THROW';

export const throwDice = () => ({
  dice: Math.floor(Math.random() * 6) + 1,
  type: THROW_DICE,
});

const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case THROW_DICE: {
      return action.dice;
    }

    /* istanbul ignore next  */
    default:
      return state;
  }
};

export default reducer;
