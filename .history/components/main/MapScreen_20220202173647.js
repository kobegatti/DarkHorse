import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { render } from "react-dom";
import MapView from "react-native-maps";

export default class MapScreen extends React.Component {
  state = {
    location: null,
    latitude: null,
    longitude: null,
    errorMsg: null,
    mounted: false,
  };

  async componentDidMount() {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      this.setState({ errorMsg: "Permission to access location was denied" });
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);

    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.errorMsg !== null) {
      return (
        <View style={styles.container}>
          <Text>{this.state.errorMsg}</Text>
        </View>
      );
    }

    return (
      <MapView
        style={{ flex: 1 }}
        showsUserLocation
        initialRegion={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
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
