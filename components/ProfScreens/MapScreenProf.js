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
  const [markers, setMarkers] = useState([]);

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
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .update({ online: !isOnline })
      .then(console.log("availability updated!"));
    setIsOnline(!isOnline);
  }

  useEffect(() => {
    let isMounted = true;
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
    })();

    //update online status
    // get vet's appointments and update markers
    const unsubscribe_1 = db
      .collection("Users")
      .doc(auth.currentUser.uid)
      .onSnapshot(
        (snapshot) => {
          const m = [];

          if (snapshot.exists) {
            setIsOnline(snapshot.data().online);
            setOnCall(snapshot.data().onCall);

            snapshot.data().appointments.forEach((appointment) => {
              m.push({
                coordinates: {
                  latitude: appointment.latitude,
                  longitude: appointment.longitude,
                },
                title: appointment.type,
              });
            });
          } else {
            console.log("No such user!");
          }

          setMarkers(m);
        },
        (error) => {
          console.log(error.message);
        }
      );

    // update user location
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .update({ user_latitude: latitude, user_longitude: longitude })
      .then(console.log("location updated!"))
      .catch((error) => alert(error.message));

    props.navigation.addListener("focus", () => setLoading(!loading));

    return () => {
      unsubscribe_1();
      isMounted = false;
    };
  }, [props.navigation, latitude, longitude, isOnline]);

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
        // latitudeDelta: 0.0922,
        // longitudeDelta: 0.0421,
        latitudeDelta: 0.222,
        longitudeDelta: 0.121,
      }}
    >
      {isOnline ? online : offline}
      {markers.map((marker) => (
        <MapView.Marker
          key={marker.title}
          coordinate={marker.coordinates}
          title={marker.title}
        />
      ))}
    </MapView>
  );
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
