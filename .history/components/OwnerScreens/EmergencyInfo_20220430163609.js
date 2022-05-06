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

const EmergencyInfo = (props) => {
  const [vetID, setVetId] = useState("");
  const [typeOfEmergency, setTypeOfEmergency] = useState("");
  const [breed, setBreed] = useState("");
  const [accepted, setAccepted] = useState("");

  const handleComplete = () => {
    console.log(
      "remove owner emergency, vet onCall = false, vet emergency removed"
    );

    // vet not on call and current emergency removed
    // db.collection("Users").doc(vetID).update({
    //   onCall: false,
    //   emergency: {},
    // });

    db.collection("Users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log(snapshot.data().emergencies);
          snapshot.data().emergencies.forEach((emergency) => {});
        } else {
          console.log("No such document");
        }
      });
  };

  const handleRemove = () => {};

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
      <View style={styles.item}>
        {accepted ? (
          <TouchableOpacity
            style={styles.commandButton}
            onPress={() => handleComplete()}
          >
            <Text style={styles.panelButtonTitle}>Complete?</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => console.log("remove owner emergency")}
          >
            <Text style={styles.panelButtonTitle}>Remove</Text>
          </TouchableOpacity>
        )}
      </View>
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
  item: {
    backgroundColor: "lightblue",
    padding: 25,
    marginVertical: 16,
    marginHorizontal: 16,
  },
  removeButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "maroon", // FF6347
    alignItems: "center",
    marginTop: 10,
  },
});
