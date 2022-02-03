import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { auth } from "../../config/firebase";

export default function ProfileScreen() {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        this.props.navigation.navigate("LogInScreen");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View>
      <Text>Profile Screen</Text>
      <TouchableOpacity onPress={this.handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
