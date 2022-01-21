import React, { useRef } from "react";
import { Text } from "react-native";
import { Card } from "react-native-elements";
import { View } from "react-native-web";
// import {  } from "bootstrap";
// import { Form, Button, Card } from "react-native";
// import {
//   Button,
//   Alert,
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   ActivityIndicator,
// } from "react-native";
const formValidationFuncs = require("../components/functions/FormValidation");

const MAX_ENTRY_LENGTH = 20;

export default function SignUpScreenOwner() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  return (
    <>
      <Card></Card>
      <View className="w-100 text-center mt-2">
        <Text>Already have an account? Log In</Text>
      </View>
    </>
  );
}
// constructor() {
//   super();
//   this.state = {
//     username: "",
//     email: "",
//     password: "",
//     isLoading: false,
//   };
// }
// function updateInputValue = (val, prop) => {
//   const new_state = this.state;
//   new_state[prop] = val;
//   this.setState(new_state);
//   console.log(prop + "= " + val);
// };

// registerUser = () => {
//   if (
//     this.state.username === "" ||
//     this.state.email === "" ||
//     this.state.password === ""
//     ) {
//       Alert.alert("Missing form entry");
//     } else if (this.state.username.length > MAX_ENTRY_LENGTH) {
//       Alert.alert("Username must be 20 characters of less");
//     } else if (!formValidationFuncs.validEmail(this.state.email)) {
//       Alert.alert("Valid email must contain '@' and '.'");
//     } else if (this.state.password.length > MAX_ENTRY_LENGTH) {
//       Alert.alert("Password must be 20 characters or less");
//     } else if (!formValidationFuncs.validPassword(this.state.password)) {
//       Alert.alert("Password must have a number and a special character");
//     }

//     this.setState({ isLoading: true });
// //   };
//   );

// UI
// const styles = StyleSheet.create({
//   formWrapper: {
//     flex: 1,
//     display: "flex",
//     justifyContent: "center",
//     padding: 30,
//     backgroundColor: "#fff",
//     flexDirection: "column",
//   },
//   formField: {
//     width: "100%",
//     alignSelf: "center",
//     borderColor: "#444",
//     borderBottomWidth: 1,
//     marginBottom: 20,
//     paddingBottom: 20,
//   },
//   redirectText: {
//     textAlign: "center",
//     color: "black",
//     marginTop: 24,
//   },
//   loading: {
//     position: "absolute",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "white",
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//   },
// });

// export default SignUpScreenOwner;
