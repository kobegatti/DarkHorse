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

  onChangeValue = (initialRegion) => {
    <Text>{JSON.stringify(initialRegion)}</Text>;
    this.setState({
      initialRegion,
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={this.state.initialRegion}
            onRegionChangeComplete={this.onChangeValue}
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
