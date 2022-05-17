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

const AppointmentInfo = (props) => {
  const [vetID, setVetId] = useState("");
  const [typeOfEmergency, setTypeOfEmergency] = useState("");
  const [breed, setBreed] = useState("");
  const [city, setCity] = useState("");
  const [accepted, setAccepted] = useState("");
  const [emergencyID, setEmergencyId] = useState("");
  const [ownerID, setOwnerID] = useState("");

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
      })
      .catch((error) => alert(error.message));

    props.navigation.navigate("MyRequests");
  };

  const handleRemove = () => {
    db.collection("Emergencies")
      .doc(emergencyID)
      .delete()
      .catch((error) => alert(error.message));

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
      })
      .catch((error) => alert(error.message));

    props.navigation.navigate("MyRequests");
  };

  useEffect(() => {
    let isMounted = true;
    setVetId(props.route.params.vet_id);
    setTypeOfEmergency(props.route.params.type);
    setBreed(props.route.params.breed);
    setCity(props.route.params.city);
    setAccepted(props.route.params.accepted);
    setEmergencyId(props.route.params.emergency_id);
    setOwnerID(props.route.params.user_id);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaView>
      <SafeAreaView style={styles.box}>
        <Text style={styles.text_title}>Type</Text>
        <Text style={styles.text_content}>{typeOfEmergency}</Text>
        <Text style={styles.text_title}>Breed</Text>
        <Text style={styles.text_content}>{breed}</Text>
        <Text style={styles.text_title}>Location</Text>
        <Text style={styles.text_content}>{city}</Text>
        <Text>{"user ID = " + ownerID}</Text>
        <Text>{"emergencyID = " + emergencyID}</Text>
        {/* <Text>{JSON.stringify(props)}</Text> */}
      </SafeAreaView>
      <TouchableOpacity
        style={styles.commandButton}
        onPress={() => handleAccept()}
      >
        <Text style={styles.panelButtonTitle}>Complete?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.commandButton}
        onPress={() => handleAccept()}
      >
        <Text style={styles.panelButtonTitle}>Abort</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(AppointmentInfo);

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
