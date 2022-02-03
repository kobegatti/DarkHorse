import { combineReducers } from "redux";
import { user } from "./user";

const Reducers = combineReducers({
  ownerState: petOwner,
});

export default Reducers;
