import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

const EditProfileScreenProf = () => {
  return (
    <View style={styles.container}>
      <Text></Text>
      <Button title="Prof Edit" onPress={() => alert("Button clicked!")} />
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
