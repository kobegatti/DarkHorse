import { USER_STATE_CHANGE, CLEAR_DATA } from "../constants/index";
import { auth, db } from "../../config/firebase";

export function clearData() {
  return (dispatch) => {
    dispatch({ type: CLEAR_DATA });
  };
}

export function fetchUser() {
  return (dispatch) => {
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log("user does not exist");
        }
      });
  };
}
