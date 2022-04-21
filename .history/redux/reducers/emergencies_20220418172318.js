import { EMERGENCIES_STATE_CHANGE, CLEAR_DATA } from "../constants";
const initialState = {
  emergencies: null,
};

export const emergencies = (state = initialState, action) => {
  switch (action.type) {
    case EMERGENCIES_STATE_CHANGE:
      return {
        ...state,
        emergencies: action.emergencies,
      };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};
