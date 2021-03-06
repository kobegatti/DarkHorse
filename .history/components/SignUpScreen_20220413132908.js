import React, { Component, useEffect, useState } from "react";
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
import { auth, db } from "../config/firebase";

const formValidationFuncs = require("./functions/FormValidation");
const MAX_ENTRY_LENGTH = 20;
const PROF = "Horse Care Professional";
const OWNER = "Horse Owner";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [typeOfUser, setTypeOfUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("CareX");
      }
    });

    return unsubscribe;
  }, []);

  const handleDropDown = (val) => {
    if (val === OWNER || val === PROF) {
      setTypeOfUser(val);
    } else {
      setTypeOfUser("");
    }
    console.log("type =", typeOfUser);
  };

  const handleSignUp = () => {
    console.log("handleSignUp");
    setIsLoading(true);
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      passwordConfirm === ""
    ) {
      Alert.alert("Missing form entry");
      setIsLoading(false);
      return;
    } else if (typeOfUser === "") {
      Alert.alert("Must select a dropdown option");
      setIsLoading(false);
      setTypeOfUser("");
      return;
    } else if (username.length > MAX_ENTRY_LENGTH) {
      Alert.alert("Username must be 20 characters or less");
      setUsername("");
      setIsLoading(false);
      return;
    } else if (!formValidationFuncs.validEmail(email.trim())) {
      Alert.alert("Valid email must contain '@' and '.'");
      setEmail("");
      setIsLoading(false);
      return;
    } else if (password.length > MAX_ENTRY_LENGTH) {
      Alert.alert("Password must be 20 characters or less");
      setPassword("");
      setIsLoading(false);
      return;
    } else if (!formValidationFuncs.validPassword(password)) {
      Alert.alert("Password must have a number and a special character");
      setPassword("");
      setPasswordConfirm("");
      setIsLoading(false);
      return;
    } else if (password !== passwordConfirm) {
      Alert.alert("Passwords do not match");
      setPasswordConfirm("");
      setIsLoading(false);
      return;
    }
    if (typeOfUser == PROF) {
      auth
        .createUserWithEmailAndPassword(email.trim(), password.trim())
        .then((userCredentials) => {
          console.log(username);
          db.collection("Users").doc(userCredentials.user.uid).set({
            username: username,
            typeOfUser: typeOfUser,
            email: email.trim(),
            userImg: null,
            bio: "",
            title: "",
            workPhone: "",
            workEmail: "",
            location: "",
            online: false,
            user_latitude: null,
            user_longitude: null,
            requests: [],
          });
        })
        .catch((error) => alert(error.message));
    } else if (typeOfUser == OWNER) {
      auth
        .createUserWithEmailAndPassword(email.trim(), password.trim())
        .then((userCredentials) => {
          console.log(username);
          db.collection("Users").doc(userCredentials.user.uid).set({
            username: username,
            typeOfUser: typeOfUser,
            email: email.trim(),
            userImg: null,
            breeds: [],
            bio: "",
            location: "",
            online: false,
            user_latitude: null,
            user_longitude: null,
            emergencies: [],
          });
        })
        .catch((error) => alert(error.message));
    }
    // auth
    //   .createUserWithEmailAndPassword(email.trim(), password.trim())
    //   .then((userCredentials) => {
    //     console.log(username);
    //     db.collection("Users").doc(userCredentials.user.uid).set({
    //       username: username,
    //       typeOfUser: typeOfUser,
    //       email: email.trim(),
    //       userImg: null,
    //       breeds: [],
    //       bio: "",
    //       title: "",
    //       workPhone: "",
    //       workEmail: "",
    //       location: "",
    //       online: false,
    //       user_latitude: null,
    //       user_longitude: null,
    //     });
    //   })
    //   .catch((error) => alert(error.message));

    setUsername("");
    setTypeOfUser("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setIsLoading(false);
  };

  return (
    <ScrollView style={styles.formWrapperScroll}>
      <View style={styles.formWrapper}>
        <Picker
          selectedValue={typeOfUser}
          onValueChange={(val) => setTypeOfUser(val)}
          style={styles.picker}
        >
          <Picker.Item
            style={{ fontWeight: "light" }}
            label="Please select an option"
            value=""
          />
          <Picker.Item label="Horse Owner" value="Horse Owner" />
          <Picker.Item
            label="Horse Care Professional"
            value="Horse Care Professional"
          />
        </Picker>
        <TextInput
          style={styles.formField}
          placeholder="Full Name"
          value={username}
          onChangeText={(val) => setUsername(val)}
        />
        <TextInput
          style={styles.formField}
          placeholder="Email"
          value={email}
          onChangeText={(val) => setEmail(val)}
        />
        <TextInput
          style={styles.formField}
          placeholder="Password"
          value={password}
          onChangeText={(val) => setPassword(val)}
          maxLength={20}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.formField}
          placeholder="Password Confirmation"
          value={passwordConfirm}
          onChangeText={(val) => setPasswordConfirm(val)}
          maxLength={20}
          secureTextEntry={true}
        />

        <View style={styles.space}></View>

        <Button
          color="lightblue"
          title="Sign Up"
          disabled={isLoading}
          onPress={() => handleSignUp()}
        />

        <Text
          style={styles.redirectText}
          onPress={() => navigation.navigate("LogInScreen")}
        >
          Already have an account? Log In
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

// UI
const styles = StyleSheet.create({
  picker: {
    flex: 1,
    paddingBottom: 80,
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
