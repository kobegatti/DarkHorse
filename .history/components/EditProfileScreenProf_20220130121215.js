import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const EditProfileScreenProf = () => {
  return (
    <View style={styles.container}>
      <Text></Text>
      <Button title="Click Here" onPress={() => alert("Button clicked!")} />
    </View>
  );
};

export default EditProfileScreenProf;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
