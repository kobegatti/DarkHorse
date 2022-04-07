import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Button, Image } from "react-native-paper";
import { auth, db } from "../config/firebase";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

export default function MapScreen(props) {
  const [currentUser, setCurrentUser] = useState(props);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [markers, setMarkers] = useState([]);
  var vet_query;

  var online = (
    <MapView.Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
      title={"Stop"}
      description={"Online/Offline Status"}
      pinColor={"green"}
      onPress={() => updateAvailability()}
    >
      <MapView.Callout>
        <View>
          <Text>GO</Text>
        </View>
      </MapView.Callout>
    </MapView.Marker>
  );

  var online2 = (
    <MapView.Marker
      coordinate={{
        latitude: 35.3,
        longitude: -120.65,
      }}
      title={"Stop"}
      pinColor={"blue"}
      onPress={() => updateAvailability()}
    >
      <MapView.Callout>
        <View>
          <Text>GO</Text>
        </View>
      </MapView.Callout>
    </MapView.Marker>
  );

  var offline = (
    <MapView.Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
      title={"Go Online"}
      description={"Online/Offline Status"}
      pinColor={"red"}
      onPress={() => updateAvailability()}
    >
      <MapView.Callout>
        <View>
          <Text>OFF</Text>
        </View>
      </MapView.Callout>
    </MapView.Marker>
  );

  function updateAvailability() {
    console.log("updating");
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .update({ online: !isOnline })
      .then(console.log("availability updated!"));
    setIsOnline(!isOnline);
  }

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

      db.collection("Users")
        .doc(auth.currentUser.uid)
        .update({ latitude: latitude, longitude: longitude })
        .then(console.log("location updated!"));

      // find online vets
      // vet_query = query(
      //   db,
      //   where("typeOfUser" == "Horse Care Professional").where("online" == true)
      // );
    })();
  }, []);

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
      {isOnline ? online : offline}

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
