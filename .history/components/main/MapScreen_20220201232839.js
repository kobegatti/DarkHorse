import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView from "react-native-maps";
import Permissions from "expo";

export default class MapScreen extends React.Component {
  state = {
    latitude: null,
    longitude: null,
  };

  async componentDidMount() {
    const {status} = await
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      ></MapView>
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
