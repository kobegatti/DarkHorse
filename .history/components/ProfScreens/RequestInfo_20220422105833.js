import React, { useState } from "react";
import { Text, View } from "react-native";

import { bindActionCreators } from "redux";
import { fetchUser, clearData } from "../../redux/actions/index";

import { auth, db } from "../../config/firebase";
import { connect } from "react-redux";

const RequestInfo = (props) => {
  const [currentUser, setCurrentUser] = useState(props);

  return (
    <View>
      <Text>{currentUser.username}</Text>
    </View>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(RequestInfo);
