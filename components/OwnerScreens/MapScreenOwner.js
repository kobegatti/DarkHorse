import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Button, Image } from "react-native-paper";
import { auth, db } from "../../config/firebase";
import { collection } from "firebase/firestore";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

export default function MapScreenOwner(props) {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  var current_location = (
    <MapView.Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
      title={"Current Location"}
      pinColor={"red"}
    ></MapView.Marker>
  );

  useEffect(() => {
    let isMounted = true;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);

      // update user location
      db.collection("Users")
        .doc(auth.currentUser.uid)
        .update({ user_latitude: latitude, user_longitude: longitude })
        .then(console.log("location updated!"))
        .catch((error) => alert(error.message));

      props.navigation.addListener("focus", () => setLoading(!loading));
    })();

    return () => {
      isMounted = false;
    };
  }, [latitude, longitude]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  if (!latitude || !longitude) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 48 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <MapView
      showsUserLocation
      zoomEnabled
      style={{ flex: 1 }}
      initialRegion={{
        latitude: latitude, //latitude
        longitude: longitude, //longitude
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {current_location}
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
