import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";

export default class MapScreen extends React.Component {
  state = {
    location: null
    latitude: null,
    longitude: null,
    errorMsg: null
  };

  componentDidMount() {
    const {status} = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted")
    {
      this.setState({errorMsg: "Permission to access location was denied"});
      return;
    }

    const {location} = await Location.getCurrentPositionAsync({});
    this.setState({latitude: location.coords.latitude, longitude: location.coords.longitude});
  }
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
