import React, { Component } from "react";
import {
  Button,
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native";
import LoginButton from "../buttons/LogInButton";

const logo_style = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  Logo: {
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flex: 0,
    width: "50%",
    height: "50%",
  },
});

class LogInOrSignUp extends Component {
  render() {
    return (
      <View style={styles.content}>
        <Image style={styles.Logo} source={require("../assets/logo.png")} />
        <LoginButton
          text="Log In"
          color="lightblue"
          onPress={() => this.props.navigation.navigate("LogInScreen")}
        />
        <Text styles={styles.or}>Or</Text>
        <LoginButton
          text="Sign Up"
          color="lightblue"
          onPress={() => this.props.navigation.navigate("SignUpProfile")}
        />
      </View>
    );
  }
}

// UI
const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    padding: 30,
    height: "50%",
  },
  formWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: 30,
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
  title: {
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
  or: {
    color: "#000000",
    marginTop: 25,
    textAlign: "center",
  },
});
export default LogInOrSignUp;
