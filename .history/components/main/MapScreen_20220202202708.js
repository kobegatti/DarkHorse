import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  Platform,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
import { render } from "react-dom";
import MapView from "react-native-maps";
import * as Location from "expo-location";

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRegion: {
        latitude: 34,
        longitude: -118,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0421,
      },
    };
  }

  componentDidMount() {
    this.handleUserLocation();
  }

  handleUserLocation = () => {
    Location.getCurrentPositionAsync((pos) => {
      Alert.alert(JSON.stringify(pos));
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={this.state.initialRegion}
          ></MapView>
        </View>
      </View>
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
