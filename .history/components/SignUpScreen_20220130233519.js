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
    if (val !== 0) {
      setTypeOfUser(val);
    } else {
      setTypeOfUser("");
    }
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
      return;
    } else if (typeOfUser.length === 0) {
      Alert.alert("Must select a dropdown option");
      return;
    } else if (username.length > MAX_ENTRY_LENGTH) {
      Alert.alert("Username must be 20 characters or less");
      setUsername("");
      return;
    } else if (!formValidationFuncs.validEmail(email)) {
      Alert.alert("Valid email must contain '@' and '.'");
      setEmail("");
      return;
    } else if (password.length > MAX_ENTRY_LENGTH) {
      Alert.alert("Password must be 20 characters or less");
      setPassword("");
      return;
    } else if (!formValidationFuncs.validPassword(password)) {
      Alert.alert("Password must have a number and a special character");
      setPassword("");
      setPasswordConfirm("");
      return;
    } else if (password !== passwordConfirm) {
      Alert.alert("Passwords do not match");
      setPasswordConfirm("");
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        db.collection("Users").doc(auth.currentUser.uid).set({
          username,
          typeOfUser,
          email,
          userImg: null,
          breeds: [],
        });
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch((error) => alert(error.message));

    setIsLoading(false);
  };

  return (
    <ScrollView style={styles.formWrapperScroll}>
      <View style={styles.formWrapper}>
        <Picker
          selectedValue={typeOfUser}
          onValueChange={(val) => handleDropDown(val)}
          style={styles.picker}
        >
          <Picker.Item
            style={{ fontWeight: "light" }}
            label="Please select an option"
            value="0"
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
