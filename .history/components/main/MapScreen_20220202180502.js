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
    mounted = true;
    Location.requestForegroundPermissionsAsync((status) => {
      if (mounted.current === false) return;
      else if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    });

    Location.getCurrentPositionAsync({}).then((loc) => {
      if (mounted.current === false) return;
      else {
        setLatitude(loc.coords.latitude);
        setLongitude(loc.coords.longitude);
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, []);
  // state = {
  //   location: null,
  //   latitude: null,
  //   longitude: null,
  //   errorMsg: null,
  //   mounted: false,
  // };

  async function componentDidMount() {
    // this.setState({ mounted: true });
    // let { status } = await Location.requestForegroundPermissionsAsync();
    // if (status !== "granted") {
    //   this.setState({ errorMsg: "Permission to access location was denied" });
    //   return;
    // }
    // Location.getCurrentPositionAsync({}).then((loc) => {
    //   if (this.state.mounted) {
    //     this.setState({
    //       latitude: loc.coords.latitude,
    //       longitude: loc.coords.longitude,
    //     });
    //   }
    // });
  }

  // function componentWillUnmount() {
  //   this.setState({ mounted: false });
  // }

  // if (this.state.latitude) {
  //   this.state.mounted = false;
  // }
  // if (this.state.errorMsg !== null) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>{this.state.errorMsg}</Text>
  //     </View>
  //   );

  return (
    <MapView
      style={{ flex: 1 }}
      showsUserLocation
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
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
