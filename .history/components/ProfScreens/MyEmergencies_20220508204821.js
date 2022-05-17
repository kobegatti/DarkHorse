import React from "react";
import {
  Flatlist,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";

import { bindActionCreators } from "redux";
import { fetchUser, clearData } from "../../redux/actions/index";
import { connect } from "react-redux";

const MyEmergencies = (props) => {
  return (
    <SafeAreaView>
      <Text style={styles.title}>My Emergencies</Text>
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(MyEmergencies);

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: StatusBar.currentUser || 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "navy",
    textAlign: "center",
  },
});
