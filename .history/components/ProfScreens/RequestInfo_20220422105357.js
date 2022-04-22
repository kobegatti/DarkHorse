import React from "react";
import { Text, View } from "react-native";

import { bindActionCreators } from "redux";
import { fetchUser, clearData } from "../../redux/actions/index";

import { auth, db } from "../../config/firebase";
import { connect } from "react-redux";

const RequestInfo = () => {
  return (
    <View>
      <Text>Hey</Text>
    </View>
  );
};
