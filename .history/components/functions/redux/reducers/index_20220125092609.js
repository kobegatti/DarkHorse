import React from "react";
import { combineReducers } from "redux";
import { petOwner } from "./PetOwner";

const Reducers = combineReducers({
  ownerState: PetOwner,
});

export default Reducers;
