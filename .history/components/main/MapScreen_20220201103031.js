import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default class MapScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      where: {},
      error: null,
    };
  }

  componentDidMount() {
    let geoOptions = {};
  }

  geoSuccess = (position) => {};

  geoFailure = (err) => {};

  render() {
    return (
      <View style={styles.container}>
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
