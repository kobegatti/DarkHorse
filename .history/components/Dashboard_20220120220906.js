import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// import firebase from "../config/firebase";
// const fb = require("../config/firebase");

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text>Email: </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText>Sign Out</Text>
        </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
// export default class Dashboard extends Component {
//   constructor() {
//     super();
//     this.state = {
//       uid: "",
//     };
//   }

//   signOut = () => {
//     // firebase
//     //   .auth()
//     //   .signOut()
//     //   .then(() => {
//     //     this.props.navigation.navigate("LogInScreen");
//     //   })
//     //   .catch((error) => this.setState({ errorMessage: error.message }));
//   };

//   render() {
//     // this.state = {
//     //   displayName: firebase.auth().currentUser.displayName,
//     //   uid: firebase.auth().currentUser.uid,
//     // };
//     return (
//       <Text>Hey</Text>
//       // <View style={styles.container}>
//       //   <Text style={styles.textStyle}>Hello, {this.state.displayName}</Text>
//       //   <Text style={styles.textStyle}>{this.state.uid}</Text>

//       //   <Button color="#3740FE" title="Logout" onPress={() => this.signOut()} />
//       // </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "lightblue",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
