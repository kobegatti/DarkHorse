import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Button, Image } from "react-native-paper";
import { auth, db } from "../../config/firebase";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchUser,
  clearData,
  fetchEmergencies,
} from "../../redux/actions/index";

const MapScreenProf = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(props);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [onCall, setOnCall] = useState(false);
  const [targetLatitude, setTargetLatitude] = useState(null);
  const [targetLongitude, setTargetLongitude] = useState(null);
  const [current_emergencies, setCurrentEmergencies] = useState([]);

  var online = (
    <MapView.Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
      title={"Stop"}
      description={"Online/Offline Status"}
      pinColor={isOnline ? "green" : "red"}
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

  var target = (
    <MapView.Marker
      coordinate={{
        latitude: 33,
        longitude: 120,
      }}
      title={"Stop"}
      pinColor={"red"}
      onPress={() => console.log("Hey")}
    >
      {/* <MapView.Callout>
        <View>
          <Text>GO</Text>
        </View>
      </MapView.Callout> */}
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

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: false,
      });
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
            setOnCall(snapshot.data().onCall);
            console.log(snapshot.data().emergency.latitude);
            setTargetLatitude(snapshot.data().emergency.latitude);
            setTargetLongitude(snapshot.data().emergency.longitude);
          } else {
            console.log("No such document!");
          }
        });

      // update user location
      db.collection("Users")
        .doc(auth.currentUser.uid)
        .update({ user_latitude: latitude, user_longitude: longitude })
        .then(console.log("location updated!"));

      // get current emergencies
      // const usersRef = db.collection("Users");
      // const snapshot = await usersRef.get();
      // snapshot.forEach((doc) => {
      //   // console.log(doc.id, "=>", doc.data());
      // });
    })();
  }, [latitude, longitude, targetLatitude, targetLongitude]);

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

  if (!targetLatitude || !targetLatitude) {
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
        {<Text>TargetLocations are null</Text>}
        {/* {target} */}
        {/* {targetLatitude != null ? target : test} */}
        {/* {<Text>{JSON.stringify(props.route)}</Text>}
        {<Text>{JSON.stringify(targetLatitude)}</Text>} */}
      </MapView>
    );
  } else {
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
        {target}
        {/* {targetLatitude != null ? target : test} */}
        {/* {<Text>{JSON.stringify(props.route)}</Text>}
      {<Text>{JSON.stringify(targetLatitude)}</Text>} */}
      </MapView>
    );
  }
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  emergencies: store.emergencyState.emergencies,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, clearData, fetchEmergencies }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(MapScreenProf);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
