import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const SignUpButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[style.button, { backgroundColor: props.color }]}>
        <Text style={style.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    padding: 16,
    width: 275,
    borderRadius: 36,
    alignItems: "center",
    marginTop: 25,
    borderWidth: 1,
  },
  text: {
    color: "#2977B9",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SignUpButton;
