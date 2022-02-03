import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";

export default class MapScreen extends React.Component {
  state = {
    latitude: null,
    longitude: null,
  };

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if (status !== "granted") {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        this.setState({ latitude, longitude }, () =>
          console.log("state: ", this.state)
        ),
      (error) => console.log("Error:", error)
    );
  }

  render() {
    const { latitude, longitude } = this.state;
    console.log(latitude);
    console.log(longitude);

    if (latitude) {
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

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Your permission is required for maps</Text>
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
