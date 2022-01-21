import React, { Component, useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";
import { auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

// export default function SignUpScreenOwner(props) {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordConfirm, setPasswordConfirm] = useState("");
//   // const [user, loading, error] = useAuthState(auth);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   // const [user, loading, error] = useAuthState(auth);
//   if (
//     username === "" ||
//     email === "" ||
//     password === "" ||
//     passwordConfirm === ""
//   ) {
//     Alert.alert("Missing form entry");
//     return;
//   } else if (username.length > MAX_ENTRY_LENGTH) {
//     Alert.alert("Username must be 20 characters or less");
//     setUsername({ username: "" });
//     return;
//   } else if (!formValidationFuncs.validEmail(email)) {
//     Alert.alert("Valid email must contain '@' and '.'");
//     setEmail({ email: "" });
//     return;
//   } else if (password.length > MAX_ENTRY_LENGTH) {
//     Alert.alert("Password must be 20 characters or less");
//     setPassword({ password: "" });
//     return;
//   } else if (!formValidationFuncs.validPassword(password)) {
//     Alert.alert("Password must have a number and a special character");
//     setPassword({ password: "" });
//     setPasswordConfirm({ passwordConfirm: "" });
//     return;
//   } else if (password !== passwordConfirm) {
//     Alert.alert("Passwords do not match");
//     setPasswordConfirm({ passwordConfirm: "" });
//     return;
//   }

//   render = () => {
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
//           <TextInput
//             style={styles.formField}
//             placeholder="Username"
//             value={username}
//             onChangeText={(val) => setUsername(val.target.value)}
//           />
//           <TextInput
//             style={styles.formField}
//             placeholder="Email"
//             value={email}
//             onChangeText={(val) => setEmail(val.target.value)}
//           />
//           <TextInput
//             style={styles.formField}
//             placeholder="Password"
//             value={password}
//             onChangeText={(val) => setPassword(val.target.value)}
//             maxLength={20}
//             secureTextEntry={true}
//           />
//           <TextInput
//             style={styles.formField}
//             placeholder="Password Confirmation"
//             value={passwordConfirm}
//             onChangeText={(val) => setPasswordConfirm(val.target.value)}
//             maxLength={20}
//             secureTextEntry={true}
//           />

//           <Button
//             color="blue"
//             title="Forgot Password"
//             disabled={loading}
//             onPress={() => console.log("Forgot pressed")}
//           />

//           <View style={styles.space}></View>

//           <Button
//             color="lightblue"
//             title="Sign Up"
//             disabled={loading}
//             onPress={() => console.log("Sign up pressed")}
//           />

//           <Text
//             style={styles.redirectText}
//             onPress={() => props.navigation.navigate("LogInScreen")}
//           >
//             Already have an account? Log In
//           </Text>
//         </View>
//       </ScrollView>
//     );
//   };
// }

const formValidationFuncs = require("../components/functions/FormValidation");
const MAX_ENTRY_LENGTH = 20;

const SignUpScreenOwner = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Dashboard");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    console.log("handleSignUp");
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      passwordConfirm === ""
    ) {
      Alert.alert("Missing form entry");
      return;
    } else if (username.length > MAX_ENTRY_LENGTH) {
      Alert.alert("Username must be 20 characters or less");
      setUsername("");
      return;
    } else if (!formValidationFuncs.validEmail(email)) {
      Alert.alert("Valid email must contain '@' and '.'");
      setEmail({ email: "" });
      return;
    } else if (password.length > MAX_ENTRY_LENGTH) {
      Alert.alert("Password must be 20 characters or less");
      setPassword({ password: "" });
      return;
    } else if (!formValidationFuncs.validPassword(password)) {
      Alert.alert("Password must have a number and a special character");
      setPassword({ password: "" });
      setPasswordConfirm({ passwordConfirm: "" });
      return;
    } else if (password !== passwordConfirm) {
      Alert.alert("Passwords do not match");
      setPasswordConfirm({ passwordConfirm: "" });
      return;
    }
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <ScrollView style={styles.formWrapperScroll}>
      <View style={styles.formWrapper}>
        <TextInput
          style={styles.formField}
          placeholder="Username"
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

        <Button
          color="blue"
          title="Forgot Password"
          disabled={isLoading}
          onPress={() => console.log("Forgot pressed")}
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

export default SignUpScreenOwner;

// export default class SignUpScreenOwner extends Component {
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

//   handleSignUp() {
//     console.log("handleSignUp");
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

//     auth
//       .createUserWithEmailAndPassword(this.state.email, this.state.password)
//       .then((userCredentials) => {
//         const user = userCredentials.user;
//         console.log(user.email);
//       })
//       .catch((error) => alert(error.message));
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
//             color="blue"
//             title="Forgot Password"
//             disabled={this.state.isLoading}
//             onPress={() => console.log("Forgot pressed")}
//           />

//           <View style={styles.space}></View>

//           <Button
//             color="lightblue"
//             title="Sign Up"
//             disabled={this.state.isLoading}
//             onPress={() => this.handleSignUp()}
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
  space: {
    width: 20,
    height: 20,
  },
});
