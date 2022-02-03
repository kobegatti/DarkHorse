import { USER_STATE_CHANGE } from "../constants/index";
import { auth, db } from "firebase";

export function fetchUser() {
  return (dispatch) => {
    db.collection("PetOwners")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log(snapshot.data());
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log("user does not exist");
        }
      });
  };
}
