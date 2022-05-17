import React from "react";
import {
  Flatlist,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { bindActionCreators } from "redux";
import { fetchUser, clearData } from "../../redux/actions/index";
import { connect } from "react-redux";

const Item = ({ item, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={() => props.navigation.navigate("Map")}
    style={[styles.item, backgroundColor]}
  >
    <Text style={[styles.injury, textColor]}>{item.type}</Text>
    <Text style={[styles.info, textColor]}>{item.breed}</Text>
    <Text style={[styles.info, textColor]}>{item.city}</Text>
  </TouchableOpacity>
);

const renderRequest = (request) => {
  return (
    <Item item={request.item} backgroundColor="#000080" textColor="#000000" />
  );
};

const MyEmergencies = (props) => {
  return (
    <SafeAreaView style={styles.listContainer}>
      <Text style={styles.title}>My Appointments</Text>
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
