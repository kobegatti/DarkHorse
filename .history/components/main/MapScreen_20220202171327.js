import React, { useState, useEffect, useRef } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import Permissions from "expo-permissions";

export default class MapScreen extends React.Component {
  state = {
    latitude: null,
    longitude: null,
  };

  async componentDidMount() {
    const { status } = await Location.getPermissionsAsync();

    if (status != "granted") {
      const response = await Location.askAsync(Permissions.LOCATION);
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        this.setState(latitude, longitude),
      (error) => console.log(error)
    );
  }
  render() {
    const { latitude, longitude } = this.state;
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
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
