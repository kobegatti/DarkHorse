import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default class MapScreen extends React.Component {
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
