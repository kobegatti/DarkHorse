import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView from "expo";

export default class MapScreen extends React.Component {
  render() {
    return <MapView style={{ flex: 1 }}></MapView>;
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
