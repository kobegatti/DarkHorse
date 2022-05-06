import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Button, Image } from "react-native-paper";
import { auth, db } from "../../config/firebase";
import { collection } from "firebase/firestore";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

export default function MapScreenOwner(props) {
  const [currentUser, setCurrentUser] = useState(props);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [vetLatitude, setVetLatitude] = useState(null);
  const [vetLongitude, setVetLongitude] = useState(null);
  const [markers, setMarkers] = useState([]);

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

  var online2 = (
    <MapView.Marker
      coordinate={{
        latitude: 35.3,
        longitude: -120.65,
      }}
      title={"Stop"}
      pinColor={"blue"}
      onPress={() => console.log("find location")}
    >
      <MapView.Callout>
        <View>
          <Text>GO</Text>
        </View>
      </MapView.Callout>
    </MapView.Marker>
  );

  useEffect(() => {
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

      //update online status
      db.collection("Users")
        .doc(auth.currentUser.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setIsOnline(snapshot.data().online);
          } else {
            console.log("No such document!");
          }
        });

      // update user location
      db.collection("Users")
        .doc(auth.currentUser.uid)
        .update({ user_latitude: latitude, user_longitude: longitude })
        .then(console.log("location updated!"));

      // find online vets
      // const usersRef = db.collection("Users");
      // const snapshot = await usersRef.get();
      // snapshot.forEach((doc) => {
      //   //console.log(doc.id, "=>", doc.data());
      // });
    })();
  }, [latitude, longitude, vetLatitude, vetLongitude]);

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

      {online2}
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
