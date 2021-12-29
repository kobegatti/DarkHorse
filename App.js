import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Let's go DarkHorse</Text>
      <Text>More text is it updating?</Text>
      <Text>What's good people?</Text>
      <Text>Is this a fake video?</Text>
      <Text>No it ain't!</Text>
      <Text>Now it's time for... IOS simulator(Hackintosh VirtualBox?)</Text>
      <Text>On VD!</Text>
      <Text>Shrimp pasta</Text>
      <Text>Testing Git!!!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
