import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import Constants from "expo-constants";
import { location, Permissions } from "expo";

export default class MapScreen extends React.Component {
  state = {
    location: null,
    errorMessage: null,
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!",
      });
    } else {
      this._getLocationAsync();
    }
  }
  render() {
    return (
      <View styles={styles.container}>
        <Text style={styles.big}>Map Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  big: {
    fontSize: 48,
  },
});
