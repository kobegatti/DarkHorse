import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../config/firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions/index";

export class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        this.props.navigation.navigate("LogInScreen");
      })
      .catch((error) => alert(error.message));
  };

  render() {
    const { currentUser } = this.props;
    console.log("user = ", currentUser);
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>{currentUser.name} is logged in</Text>
        <Text>Email: {auth.currentUser?.email}</Text>
        <TouchableOpacity onPress={this.handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// const Dashboard = () => {
//   const navigation = useNavigation();

//   const componentDidMount = () => {
//     console.log("fetchUser");
//     fetchUser();
//   };

//   const handleSignOut = () => {
//     auth
//       .signOut()
//       .then(() => {
//         navigation.navigate("LogInScreen");
//       })
//       .catch((error) => alert(error.message));
//   };

//   return (
//     <View style={styles.container}>
//       <Text>User is Logged In</Text>
//       <Text>Email: {auth.currentUser?.email}</Text>
//       <TouchableOpacity onPress={handleSignOut} style={styles.button}>
//         <Text style={styles.buttonText}>Sign Out</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

const mapStateToProps = (store) => ({
  currentUser: store.ownerState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Dashboard);
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
