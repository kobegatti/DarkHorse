import React from "react";
import { combineReducers } from "redux";
import { PetOwner } from "./PetOwner";

const Reducers = combineReducers({
  ownerState: PetOwner,
});

export default Reducers;
