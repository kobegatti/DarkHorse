import React from "react";
import { Text, StyleSheet } from "react-native";

export default function EmergencyRequests(props) {
  return <Text>Vets receive requests here!</Text>;
}

// UI
const styles = StyleSheet.create({
  picker: {
    flex: 1,
    paddingBottom: 80,
  },
  errorContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
  },
  errorTitle: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  formWrapperScroll: {
    flex: 1,
    display: "flex",
    padding: 0,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  formWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  formField: {
    width: "100%",
    alignSelf: "center",
    borderColor: "#444",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingBottom: 20,
  },
  redirectText: {
    textAlign: "center",
    color: "black",
    marginTop: 24,
  },
  loading: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  space: {
    width: 20,
    height: 20,
  },
});