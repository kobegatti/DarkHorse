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

const RequestInfo = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(props);
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [ownerID, setOwnerID] = useState("");
  const [emergencyID, setEmergencyId] = useState("");
  const [vetID, setVetId] = useState("");

  const handleAccept = () => {
    // Update owner emergency info
    const obj = {
      type: type,
      breed: breed,
      accepted: false,
      emergency_id: emergencyID,
      vet_id: "",
    };

    // Update emergency info for owners
    db.collection("Users")
      .doc(ownerID)
      .update({
        emergencies: firebase.firestore.FieldValue.arrayRemove(obj),
      })
      .catch((error) => alert(error.message));

    db.collection("Users")
      .doc(ownerID)
      .update({
        emergencies: firebase.firestore.FieldValue.arrayUnion({
          type: type,
          breed: breed,
          emergency_id: emergencyID,
          accepted: true,
          vet_id: auth.currentUser.uid,
        }),
      })
      .catch((error) => alert(error.message));

    // set Emergency to Accepted
    db.collection("Emergencies")
      .doc(emergencyID)
      .update({ accepted: true })
      .catch((error) => alert(error.message));
    // db.collection("Emergencies")
    //   .doc(emergencyID)
    //   .delete()
    //   .catch((error) => alert(error.message));

    // Vets
    // Set onCall to true, add appointment to vet's queue
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .update({
        onCall: true,
        appointments: firebase.firestore.FieldValue.arrayUnion({
          type: type,
          breed: breed,
          emergency_id: emergencyID,
          accepted: true,
          vet_id: auth.currentUser.uid,
          latitude: latitude,
          longitude: longitude,
        }),
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    let isMounted = true;
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setCurrentUser(snapshot.data());
        } else {
          console.log("user does not exist");
        }
      })
      .catch((error) => alert(error.message));

    setType(props.route.params.type);
    setBreed(props.route.params.breed);
    setCity(props.route.params.city);
    setLatitude(props.route.params.latitude);
    setLongitude(props.route.params.longitude);
    setOwnerID(props.route.params.user_id);
    setEmergencyId(props.route.params.emergency_id);
    setVetId(props.route.params.vet_id);

    props.navigation.addListener("focus", () => setLoading(!loading));

    return () => {
      isMounted = false;
    };
  }, [props.navigation, loading]);

  return (
    <SafeAreaView>
      <SafeAreaView style={styles.box}>
        <Text style={styles.text_title}>Type</Text>
        <Text style={styles.text_content}>{type}</Text>
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
        <Text style={styles.panelButtonTitle}>Accept</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(RequestInfo);

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
