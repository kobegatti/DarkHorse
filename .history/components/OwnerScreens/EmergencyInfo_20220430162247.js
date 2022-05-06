import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import { bindActionCreators } from "redux";
import { fetchUser, clearData } from "../../redux/actions/index";

import { auth, db } from "../../config/firebase";
import { connect } from "react-redux";
import firebase from "firebase";
import { acc } from "react-native-reanimated";
import { Item } from "react-native-paper/lib/typescript/components/List/List";

const EmergencyInfo = (props) => {
  const [vetID, setVetId] = useState("");
  const [typeOfEmergency, setTypeOfEmergency] = useState("");
  const [breed, setBreed] = useState("");
  const [accepted, setAccepted] = useState("");

  useEffect(() => {
    setVetId(props.route.params.vet_id);
    setTypeOfEmergency(props.route.params.type);
    setBreed(props.route.params.breed);
    setAccepted(props.route.params.accepted);
  }, []);

  return (
    <SafeAreaView>
      <Text>{"vet_id = " + vetID}</Text>
      <Text>{"type = " + typeOfEmergency}</Text>
      <Text>{"breed = " + breed}</Text>
      <Text>{"accepted = " + accepted}</Text>

      {accepted ? (<TouchableOpacity
          style={styles.statusButton}
          onPress={() =>
            console.log("remove owner emergency, vet onCall = false, vet emergency removed")
          }
        >
          <Text style={styles.panelButtonTitle}>Complete?</Text>
        </TouchableOpacity>) : ()}
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(EmergencyInfo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  box: {
    alignItems: "center",
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    color: "#666",
    backgroundColor: "lightblue",
  },
  text_title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "navy",
  },
  text_content: {
    fontSize: 24,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "green", // FF6347
    alignItems: "center",
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});
