import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default class MapScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Map Screen</Text>
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
});
