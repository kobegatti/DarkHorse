import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { render } from "react-dom";

export default class MapScreen extends React.Component {
  state = {
    location: null,
    latitude: null,
    longitude: null,
    errorMsg: null
  };

  componentDidMount() {
    const {status} = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted")
    {
      this.setState({errorMsg: "Permission to access location was denied"});
      return;
    }

    const {location} = await Location.getCurrentPositionAsync({});
    this.setState({latitude: location.coords.latitude, longitude: location.coords.longitude});
  }

  if (this.state.errorMsg === null) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  render() {
    return (
      <View style={styles.container}>
      <Text>{this.state.errorMsg}</Text>
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
