import React, { useState } from "react";
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

export default function EmergencyForm(props) {
  const [currentUser, setCurrentUser] = useState(props);
  const [breeds, setBreeds] = useState([]);
  const [breed, setBreed] = useState("");
  const [typeOfEmergency, setTypeOfEmergency] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ScrollView style={styles.formWrapperScroll}>
      <View style={styles.formWrapper}>
        <Text>Breed</Text>
        <Picker
          selectedValue={breed}
          onValueChange={(val) => setBreed(val)}
          style={styles.picker}
        ></Picker>
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
}

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
