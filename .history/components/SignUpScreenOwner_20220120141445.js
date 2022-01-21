import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";
import { auth, registerOwnerWithEmailAndPassword } from "../config/firebase";

export default function SignUpScreenOwner() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [user, loading, error] = useAuthState(auth);

  // render() {
  //   if (this.state.isLoading) {
  //     return (
  //       <View style={styles.loading}>
  //         <ActivityIndicator size="large" color="grey" />
  //       </View>
  //     );
  //   }

  return (
    <ScrollView style={styles.formWrapperScroll}>
      <View style={styles.formWrapper}>
        {/* <Text>{error}</Text> */}
        {/* <Text>{JSON.stringify(currentUser)}</Text> */}
        <TextInput
          style={styles.formField}
          placeholder="Username"
          value={username}
          onChangeText={(val) => this.updateInputValue(val, "username")}
        />
        <TextInput
          style={styles.formField}
          placeholder="Email"
          value={email}
          onChangeText={(val) => setEmail(val.target.value)}
        />
        <TextInput
          style={styles.formField}
          placeholder="Password"
          value={password}
          onChangeText={(val) => setPassword(val.target.value)}
          maxLength={20}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.formField}
          placeholder="Password Confirmation"
          value={passwordConfirm}
          onChangeText={(val) => setPasswordConfirm(val.target.value)}
          maxLength={20}
          secureTextEntry={true}
        />

        <Button
          style={styles.redirectText}
          color="lightblue"
          title="Forgot Password"
          disabled={loading}
          onPress={() => console.log("Forgot pressed")}
        />

        <Button
          color="lightblue"
          title="Sign Up"
          disabled={loading}
          onPress={() => console.log("Sign up pressed")}
        />

        <Text
          style={styles.redirectText}
          onPress={() => this.props.navigation.navigate("LogInScreen")}
        >
          Already have an account? Log In
        </Text>
      </View>
    </ScrollView>
  );
}

// import React, { Component, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Button,
//   Text,
//   StyleSheet,
//   TextInput,
//   ScrollView,
//   View,
// } from "react-native";
// import firebase from "firebase";

// const formValidationFuncs = require("../components/functions/FormValidation");
// const MAX_ENTRY_LENGTH = 20;

// class SignUpScreenOwner extends Component {
//   constructor() {
//     super();
//     this.state = {
//       username: "",
//       email: "",
//       password: "",
//       passwordConfirm: "",
//       isLoading: false,
//       error: "",
//     };
//   }

//   updateInputValue = (val, prop) => {
//     const new_state = this.state;
//     new_state[prop] = val;
//     this.setState(new_state);
//   };

//   handleSubmit() {
//     console.log("handleSubmit");
//     if (
//       this.state.username === "" ||
//       this.state.email === "" ||
//       this.state.password === "" ||
//       this.state.passwordConfirm === ""
//     ) {
//       Alert.alert("Missing form entry");
//       return;
//     } else if (this.state.username.length > MAX_ENTRY_LENGTH) {
//       Alert.alert("Username must be 20 characters or less");
//       this.setState({ username: "" });
//       return;
//     } else if (!formValidationFuncs.validEmail(this.state.email)) {
//       Alert.alert("Valid email must contain '@' and '.'");
//       this.setState({ email: "" });
//       return;
//     } else if (this.state.password.length > MAX_ENTRY_LENGTH) {
//       Alert.alert("Password must be 20 characters or less");
//       this.setState({ password: "" });
//       return;
//     } else if (!formValidationFuncs.validPassword(this.state.password)) {
//       Alert.alert("Password must have a number and a special character");
//       this.setState({ password: "" });
//       this.setState({ passwordConfirm: "" });
//       return;
//     } else if (this.state.password !== this.state.passwordConfirm) {
//       Alert.alert("Passwords do not match");
//       this.setState({ passwordConfirm: "" });
//       return;
//     }
//   }

//   render() {
//     if (this.state.isLoading) {
//       return (
//         <View style={styles.loading}>
//           <ActivityIndicator size="large" color="grey" />
//         </View>
//       );
//     }

//     return (
//       <ScrollView style={styles.formWrapperScroll}>
//         <View style={styles.formWrapper}>
//           <Text>{this.error}</Text>
//           {/* <Text>{JSON.stringify(currentUser)}</Text> */}
//           <TextInput
//             style={styles.formField}
//             placeholder="Username"
//             value={this.state.username}
//             onChangeText={(val) => this.updateInputValue(val, "username")}
//           />
//           <TextInput
//             style={styles.formField}
//             placeholder="Email"
//             value={this.state.email}
//             onChangeText={(val) => this.updateInputValue(val, "email")}
//           />
//           <TextInput
//             style={styles.formField}
//             placeholder="Password"
//             value={this.state.password}
//             onChangeText={(val) => this.updateInputValue(val, "password")}
//             maxLength={20}
//             secureTextEntry={true}
//           />
//           <TextInput
//             style={styles.formField}
//             placeholder="Password Confirmation"
//             value={this.state.passwordConfirm}
//             onChangeText={(val) =>
//               this.updateInputValue(val, "passwordConfirm")
//             }
//             maxLength={20}
//             secureTextEntry={true}
//           />

//           <Button
//             color="lightblue"
//             title="Sign Up"
//             disabled={this.state.isLoading}
//             onPress={() => this.handleSubmit()}
//           />

//           <Text
//             style={styles.redirectText}
//             onPress={() => this.props.navigation.navigate("LogInScreen")}
//           >
//             Already have an account? Log In
//           </Text>
//         </View>
//       </ScrollView>
//     );
//   }
// }

// UI
const styles = StyleSheet.create({
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
    padding: 30,
    backgroundColor: "#fff",
    flexDirection: "column",
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
});

// export default SignUpScreenOwner;
