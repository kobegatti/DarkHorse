import React from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default class MapScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
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
