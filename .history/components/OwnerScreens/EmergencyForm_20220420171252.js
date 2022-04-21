import React, { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  Picker,
} from "react-native";
import { auth, db } from "../../config/firebase";
import firebase from "firebase";
import { bindActionCreators } from "redux";
import { fetchUser, clearData } from "../../redux/actions/index";
import { connect } from "react-redux";

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
  const [onlineVets, setOnlineVets] = useState([]);

  const isDuplicate = () => {
    var sameRequest = false;

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
              return true;
            }
          } else {
            console.log("regular emergency");
            console.log(breed + " = " + request.data().breed);
            console.log(
              typeOfEmergency + " = " + request.data().typeOfEmergency
            );
            console.log(auth.currentUser.uid + " = " + request.data().user_id);
            if (
              breed == request.data().breed &&
              typeOfEmergency == request.data().typeOfEmergency &&
              auth.currentUser.uid == request.data().user_id
            ) {
              return true;
            }
          }
        });
      });
    return false;
  };

  function handleRequest() {
    var requestStatus;

    if (typeOfEmergency == "Other") {
      console.log("it's other");
      setTypeOfEmergency(otherEmergency);
      console.log(typeOfEmergency);
    }
    console.log("other emerg = " + otherEmergency);
    console.log("type = " + typeOfEmergency);

    setOtherEmergency("");

    requestStatus = isDuplicate();
    console.log("requestStatus = " + requestStatus);

    // check if user has emergencies
    // db.collection("Emergencies")
    //   .doc()
    //   .get()
    //   .then((snapshot) => {
    //     // user has emergencies, check to see if this request is a duplicate
    //     if (snapshot.exists) {
    //       snapshot.data().requests.forEach((request) => {
    //         if (typeOfEmergency == "Other") {
    //           if (
    //             breed == request.breed &&
    //             otherEmergency == request.typeOfEmergency &&
    //             auth.currentUser.uid == request.user_id
    //           ) {
    //             sameRequest = true;
    //           }
    //         } else {
    //           if (
    //             breed == request.breed &&
    //             typeOfEmergency == request.typeOfEmergency &&
    //             auth.currentUser.uid == request.user_id
    //           ) {
    //             sameRequest = true;
    //           }
    //         }
    //       });

    //       if (!sameRequest) {
    //         if (typeOfEmergency == "Other") {
    //           db.collection("Emergencies").doc(auth.currentUser.uid).update({
    //             breed: breed,
    //             typeOfEmergency: otherEmergency,
    //             accepted: false,
    //             user_id: auth.currentUser.uid,
    //           });
    //         } else {
    //           db.collection("Emergencies").doc(auth.currentUser.uid).update({
    //             breed: breed,
    //             typeOfEmergency: typeOfEmergency,
    //             accepted: false,
    //             user_id: auth.currentUser.uid,
    //           });
    //         }
    //         Alert.alert("Your request has been submitted!");
    //       } else {
    //         Alert.alert("Duplicate request");
    //       }
    //       // no current emergencies for user
    //     } else {
    //       db.collection("Emergencies").doc().set({
    //         breed: breed,
    //         typeOfEmergency: typeOfEmergency,
    //         accepted: false,
    //         user_id: auth.currentUser.uid,
    //       });
    //       console.log(sameRequest);
    //       Alert.alert("Your request has been submitted!");
    //     }
    //   });
  }

  useEffect(() => {
    //console.log("USE EFFECT");
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
  }, [props.navigation, loading]);

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
