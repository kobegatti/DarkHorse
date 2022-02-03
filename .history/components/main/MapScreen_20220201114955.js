import React from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default class MapScreen extends React.Component {
  state = {
    location: null,
    geocode: null,
    errorMessage: "",
  };

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(
      Permissions.LOCATION_BACKGROUND
    );
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Map</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center",
  },
  big: {
    fontSize: 48,
  },
});
