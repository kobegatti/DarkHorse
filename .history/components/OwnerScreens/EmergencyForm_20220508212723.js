import React, { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { auth, db } from "../../config/firebase";
import firebase from "firebase";
import { bindActionCreators } from "redux";
import { fetchUser, clearData } from "../../redux/actions/index";
import { connect } from "react-redux";
import * as Location from "expo-location";

const EmergencyForm = (props) => {
  const emergencies = [
    "Choke",
    "Colic",
    "Eye Trauma",
    "Joints/Tendons/Lameness",
    "Laceration",
    "Reproductive",
    "Other",
  ];
  const [currentUser, setCurrentUser] = useState(props);
  const [breeds, setBreeds] = useState([]);
  const [breed, setBreed] = useState("");
  const [typeOfEmergency, setTypeOfEmergency] = useState("");
  const [otherEmergency, setOtherEmergency] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const findCity = async (latitude, longitude) => {
    const place = await Location.reverseGeocodeAsync({
      latitude: latitude,
      longitude: longitude,
    });

    let city;
    place.find((p) => {
      city = p.city;
      console.log(p.city);
      setCity(p.city);
    });
  };

  function handleRequest() {
    var sameRequest = false;

    if (typeOfEmergency == "Other") {
      console.log("it's other");
      setTypeOfEmergency(otherEmergency);
      console.log(typeOfEmergency);
    }
    console.log("other emerg = " + otherEmergency);
    console.log("type = " + typeOfEmergency);

    setOtherEmergency("");
    db.collection("Emergencies")
      .get()
      .then((snapshot) => {
        snapshot.forEach((request) => {
          // console.log(request.id + " => " + request.data());
          if (typeOfEmergency == "Other") {
            if (
              breed == request.data().breed &&
              otherEmergency == request.data().typeOfEmergency &&
              auth.currentUser.uid == request.data().user_id
            ) {
              sameRequest = true;
            }
          } else {
            console.log("regular emergency");
            if (
              breed == request.data().breed &&
              typeOfEmergency == request.data().typeOfEmergency &&
              auth.currentUser.uid == request.data().user_id
            ) {
              sameRequest = true;
            }
          }
        });

        if (sameRequest) {
          Alert.alert("This is a duplicate request");
        } else {
          var newEmergencyRef = db.collection("Emergencies").doc();
          var newEmergencyRefID = newEmergencyRef.id;
          newEmergencyRef.set({
            breed: breed,
            typeOfEmergency: typeOfEmergency,
            accepted: false,
            user_id: auth.currentUser.uid,
            latitude: latitude,
            longitude: longitude,
          });

          db.collection("Users")
            .doc(auth.currentUser.uid)
            .update({
              emergencies: firebase.firestore.FieldValue.arrayUnion({
                type: typeOfEmergency,
                breed: breed,
                accepted: false,
                emergency_id: newEmergencyRefID,
                vet_id: "",
              }),
            });

          Alert.alert("Your request has been submitted!");
        }

        props.navigation.navigate("MyRequests");
      });
  }

  useEffect(() => {
    console.log("HI");
    async () => {
      // let isMounted = true;
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log("location = " + location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);

      // return () => {
      //   isMounted = false;
    };

    db.collection("Users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setCurrentUser(snapshot.data());
          setBreeds(snapshot.data().breeds);
        } else {
          console.log("user does not exist");
        }
      });

    props.navigation.addListener("focus", () => setLoading(!loading));
  }, [props.navigation, loading, latitude, longitude]);

  return (
    <ScrollView style={styles.formWrapperScroll}>
      <View style={styles.formWrapper}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Breed</Text>
        <Picker
          selectedValue={breed}
          onValueChange={(val) => setBreed(val)}
          style={styles.picker}
        >
          {breeds.map((b, i) => {
            return (
              <Picker.Item
                style={{ fontWeight: "light" }}
                label={b}
                value={b}
              />
            );
          })}
        </Picker>

        <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 12 }}>
          Type of Emergency
        </Text>
        <Picker
          selectedValue={typeOfEmergency}
          onValueChange={(val) => setTypeOfEmergency(val)}
          style={styles.picker}
        >
          {emergencies.map((e, i) => {
            return (
              <Picker.Item
                style={{ fontWeight: "light" }}
                label={e}
                value={e}
              />
            );
          })}
        </Picker>

        {typeOfEmergency == "Other" ? (
          <TextInput
            style={styles.formField}
            placeholder="What kind of emergency?"
            value={otherEmergency}
            onChangeText={(val) => setOtherEmergency(val)}
          ></TextInput>
        ) : (
          <View></View>
        )}

        <View style={styles.space}></View>

        <Button
          color="lightblue"
          title="Request Vet"
          disabled={isLoading}
          onPress={() => handleRequest()}
        />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(EmergencyForm);

// UI
const styles = StyleSheet.create({
  picker: {
    flex: 1,
    paddingBottom: 50,
  },
  errorContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
  },
  errorTitle: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  formWrapperScroll: {
    flex: 1,
    display: "flex",
    padding: 0,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  formWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  formField: {
    width: "100%",
    alignSelf: "center",
    borderColor: "#444",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingBottom: 20,
  },
  redirectText: {
    textAlign: "center",
    color: "black",
    marginTop: 24,
  },
  loading: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  space: {
    width: 20,
    height: 20,
  },
});
