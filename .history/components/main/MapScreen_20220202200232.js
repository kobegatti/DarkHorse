import React, { useState, useEffect, useRef } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { render } from "react-dom";
import MapView from "react-native-maps";

export default function MapScreen() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mounted = useRef(false);

  async function fetchData() {
    Location.requestForegroundPermissionsAsync((status) => {
      if (mounted.current === null) return;
      else if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    });

    Location.getCurrentPositionAsync({}).then((loc) => {
      if (mounted.current === null) return;
      else {
        setLatitude(loc.coords.latitude);
        setLongitude(loc.coords.longitude);
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MapView
      style={{ flex: 1 }}
      showsUserLocation
      initialRegion={{
        latitude: 50,
        longitude: 2,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    ></MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
