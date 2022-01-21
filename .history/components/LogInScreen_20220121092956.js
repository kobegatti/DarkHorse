import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { auth } from "../config/firebase";

const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = () => {
    auth
      .signInwithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with: ", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={(val) => setEmail(val)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Password"
        value={password}
        onChangeText={(val) => setPassword(val)}
        maxLength={20}
        secureTextEntry={true}
      />
      <Button color="lightblue" title="Sign In" onPress={handleLogIn} />

      <Text
        style={styles.loginText}
        onPress={() => this.props.navigation.navigate("SignUpProfile")}
      >
        Don't have account? Click here to sign up
      </Text>
    </View>
  );
};

// class LogInScreen extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: "",
//       password: "",
//       isLoading: false,
//     };
//   }

//   updateInputValue = (val, prop) => {
//     const new_state = this.state;
//     new_state[prop] = val;
//     this.setState(new_state);
//     console.log(prop + "= " + val);
//   };

//   userLogin = () => {
//     if (this.state.email === "" || this.state.password === "") {
//       Alert.alert("Missing email or password");
//     }
//     console.log("User login");
//     // this.setState({
//     //   isLoading: true,
//     // });
//   };

//   render() {
//     if (this.state.isLoading) {
//       return (
//         <View style={styles.preloader}>
//           <ActivityIndicator size="large" color="#9E9E9E" />
//         </View>
//       );
//     }

//     return (
//       <View style={styles.container}>
//         <TextInput
//           style={styles.inputStyle}
//           placeholder="Email"
//           value={this.state.email}
//           onChangeText={(val) => this.updateInputValue(val, "email")}
//         />
//         <TextInput
//           style={styles.inputStyle}
//           placeholder="Password"
//           value={this.state.password}
//           onChangeText={(val) => this.updateInputValue(val, "password")}
//           maxLength={20}
//           secureTextEntry={true}
//         />
//         <Button
//           color="lightblue"
//           title="Sign In"
//           onPress={() => this.userLogin()}
//         />

//         <Text
//           style={styles.loginText}
//           onPress={() => this.props.navigation.navigate("SignUpProfile")}
//         >
//           Don't have account? Click here to sign up
//         </Text>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginText: {
    color: "#000000",
    marginTop: 25,
    textAlign: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});

export default LogInScreen;
