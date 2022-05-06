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
import { useNavigation } from "@react-navigation/native";

const RequestInfo = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(props);
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const navigation = useNavigation();

  const handleAccept = () => {
    console.log("Accept button pushed");

    // Set onCall to true, submit emergency
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .update({
        onCall: true,
        emergency: {
          type: type,
          breed: breed,
          city: city,
          latitude: latitude,
          longitude: longitude,
        },
      });

    // Navigate to map screen with new location data
    // props.navigation.navigate("MapScreenProf");
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

    setType(props.route.params.type);
    setBreed(props.route.params.breed);
    setCity(props.route.params.city);
    setLatitude(props.route.params.latitude);
    setLongitude(props.route.params.longitude);

    props.navigation.addListener("focus", () => setLoading(!loading));
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
        <Text>{latitude}</Text>
        <Text>{longitude}</Text>
        <Text>{JSON.stringify(props.navigation)}</Text>
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
