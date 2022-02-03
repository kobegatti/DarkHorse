import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { auth } from "../config/firebase";
export class ProfileScreen extends Component {
  handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        this.props.navigation.navigate("LogInScreen");
      })
      .catch((error) => alert(error.message));
  };

  render() {
    return (
      <View>
        <Text>Profile Screen</Text>
        <View style={{ padding: 30 }}></View>
        <TouchableOpacity onPress={this.handleSignOut()}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ProfileScreen;
