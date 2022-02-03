import React, { useState, useEffect, useRef } from "react";
import { Platform, Text, View, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";
import { render } from "react-dom";
import MapView from "react-native-maps";

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRegion: {
        latitude: 34,
        longitude: -118,
        latitudeDelta: 0.0122,
        longitudeDelta:
          Dimensions.get("window").width / Dimensions.get("window"),
      },
    };
  }
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        showsUserLocation
        initialRegion={{
          latitude: 50,
          longitude: 2,
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
    justifyContent: "center",
    alignItems: "center",
  },
});
