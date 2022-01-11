import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const LoginButton = (props) => {
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
    width: 200,
    borderRadius: 24,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});

export default LoginButton;
