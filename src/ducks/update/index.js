export const APPLY_UPDATE = 'update/APPLY';
export const SHOW_UPDATE = 'update/SHOW';

export const applyUpdate = () => ({
  type: APPLY_UPDATE,
});

export const showUpdate = () => ({
  type: SHOW_UPDATE,
});

const initialState = false;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLY_UPDATE: {
      return false;
    }

    case SHOW_UPDATE: {
      return true;
    }

    /* istanbul ignore next  */
    default:
      return state;
  }
};

export default reducer;
