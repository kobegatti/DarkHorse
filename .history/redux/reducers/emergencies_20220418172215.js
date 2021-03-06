import { EMERGENCIES_STATE_CHANGE, CLEAR_DATA } from "../constants";
const initialState = {
  emergencies: null,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};
