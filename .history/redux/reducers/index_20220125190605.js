import { combineReducers } from "redux";
import { petOwner } from "./PetOwner";

const Reducers = combineReducers({
  ownerState: petOwner,
});

export default Reducers;
