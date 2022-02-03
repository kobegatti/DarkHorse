import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { Constants, location, Permissions } from "expo";

export default class MapScreen extends React.Component {
  state = {
    location: null,
    errorMessage: null,
  };
  render() {
    return (
      <View styles={styles.container}>
        <Text style={styles.big}>Map Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  big: {
    fontSize: 48,
  },
});
