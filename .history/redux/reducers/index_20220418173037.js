import { combineReducers } from "redux";
import { emergencies } from "./emergencies";
import { user } from "./user";

const Reducers = combineReducers({
  userState: user,
  emergencyState: emergencies,
});

export default Reducers;
