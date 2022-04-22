import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

import { bindActionCreators } from "redux";
import { fetchUser, clearData } from "../../redux/actions/index";

import { auth, db } from "../../config/firebase";
import { connect } from "react-redux";

const RequestInfo = (props) => {
  const [loading, setLoading] = useState(true);
  const { type } = props.match.params.type;

  const [currentUser, setCurrentUser] = useState(props);

  const test = (props) => {
    const { type } = props.match.params;
  };
  useEffect(() => {
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setCurrentUser(snapshot.data());
        } else {
          console.log("user does not exist");
        }
      });

    props.navigation.addListener("focus", () => setLoading(!loading));
  }, [props.navigation, loading]);

  return (
    <View>
      <Text>{currentUser.username}</Text>
      <Text>{JSON.stringify(props)}</Text>
    </View>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(RequestInfo);
