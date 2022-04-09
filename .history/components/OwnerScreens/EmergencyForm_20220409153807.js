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
import { bindActionCreators } from "redux";
import { fetchUser, clearData } from "../../redux/actions/index";
import { connect } from "react-redux";

const EmergencyForm = (props) => {
  const [currentUser, setCurrentUser] = useState(props);
  const [breeds, setBreeds] = useState([]);
  const [breed, setBreed] = useState("");
  const [typeOfEmergency, setTypeOfEmergency] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("USE EFFECT");
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setCurrentUser(snapshot.data());
          var ret_arr = [];
          for (var i = 0; i < snapshot.data().breeds.length; i++) {
            ret_arr.push(snapshot.data().breeds[i]);
            console.log(snapshot.data().breeds[i]);
            setBreeds(breeds.push(snapshot.data().breeds[i]));
          }

          //setBreeds(ret_arr);
          console.log("breeds = ", breeds);
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
            return <Picker.Item key={i} value={b} />;
          })}
        </Picker>
        <TextInput
          style={styles.formField}
          placeholder="Breed"
          value={breed}
          onChangeText={(val) => setBreed(val)}
        />
        <TextInput
          style={styles.formField}
          placeholder="Type Of Emergency"
          value={typeOfEmergency}
          onChangeText={(val) => setTypeOfEmergency(val)}
        />

        <View style={styles.space}></View>

        <Button
          color="lightblue"
          title="Request Vet"
          disabled={isLoading}
          onPress={() => console.log("send data to vets here!")}
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
