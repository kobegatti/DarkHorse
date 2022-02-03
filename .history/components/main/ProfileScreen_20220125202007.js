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
      <View style={{ padding: 30 }}></View>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
