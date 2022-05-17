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
  const [emergencyID, setEmergencyId] = useState("");

  const handleComplete = () => {
    console.log(
      "remove owner emergency, vet onCall = false, vet emergency removed"
    );

    // vet not on call and current emergency removed
    db.collection("Users")
      .doc(vetID)
      .update({
        onCall: false,
        emergency: {},
      })
      .catch((error) => alert(error.message));

    db.collection("Users")
      .doc(auth.currentUser.uid)
      .update({
        emergencies: firebase.firestore.FieldValue.arrayRemove({
          breed: breed,
          accepted: true,
          type: typeOfEmergency,
          vet_id: vetID,
          emergency_id: emergencyID,
        }),
      });

    props.navigation.navigate("MyRequests");
  };

  const handleRemove = () => {
    db.collection("Emergencies").doc(emergencyID).delete();

    db.collection("Users")
      .doc(auth.currentUser.uid)
      .update({
        emergencies: firebase.firestore.FieldValue.arrayRemove({
          breed: breed,
          accepted: false,
          type: typeOfEmergency,
          vet_id: vetID,
          emergency_id: emergencyID,
        }),
      });

    props.navigation.navigate("MyRequests");
  };

  useEffect(() => {
    setVetId(props.route.params.vet_id);
    setTypeOfEmergency(props.route.params.type);
    setBreed(props.route.params.breed);
    setAccepted(props.route.params.accepted);
    setEmergencyId(props.route.params.emergency_id);
  }, []);

  return (
    <SafeAreaView>
      <Text>{"vet_id = " + vetID}</Text>
      <Text>{"type = " + typeOfEmergency}</Text>
      <Text>{"breed = " + breed}</Text>
      <Text>{"accepted = " + accepted}</Text>
      <Text>{"emergency_id = " + emergencyID}</Text>
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
            onPress={() => handleRemove()}
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
