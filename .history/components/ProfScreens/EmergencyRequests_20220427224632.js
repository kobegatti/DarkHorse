import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { auth, db } from "../../config/firebase";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchUser,
  clearData,
  fetchEmergencies,
} from "../../redux/actions/index";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

const EmergencyRequests = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(props);
  const [requests, setRequests] = useState([]);
  const [streetNumber, setStreetNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [currentEmergency, setCurrentEmergency] = useState(null);
  const navigation = useNavigation();

  const findCity = async (latitude, longitude) => {
    const place = await Location.reverseGeocodeAsync({
      latitude: latitude,
      longitude: longitude,
    });

    let city;
    place.find((p) => {
      city = p.city;
      console.log(p.city);
      console.log("streetNumber = " + p.streetNumber);
      setStreetNumber(p.streetNumber);
      setStreet(p.street);
      setCity(p.city);
      setRegion(p.region);
      setPostalCode(p.postalCode);
    });
  };

  useEffect(() => {
    // Get Current User
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setCurrentUser(snapshot.data());
          setCurrentEmergency(snapshot.data().emergency);
        } else {
          console.log("user does not exist");
        }
      });

    // Set status to online
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .update({ online: true })
      .then(() => console.log("offline now!"));

    // Get Emergencies
    db.collection("Emergencies").onSnapshot((snapshot) => {
      const emergencies = [];
      snapshot.forEach((doc) => {
        findCity(doc.data().latitude, doc.data().longitude);
        emergencies.push({
          accepted: doc.data().accepted,
          breed: doc.data().breed,
          type: doc.data().typeOfEmergency,
          user_id: doc.data().user_id,
          id: doc.id,
          streetNumber: streetNumber,
          street: street,
          city: city,
          region: region,
          postalCode: postalCode,
          latitude: doc.data().latitude,
          longitude: doc.data().longitude,
        });
      });
      setRequests(emergencies);
    });
    props.navigation.addListener("focus", () => setLoading(!loading));
  }, [props.navigation, loading, city]);

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  };

  const Item = ({ item, backgroundColor, textColor }) => (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("RequestInfo", {
          type: item.type,
          breed: item.breed,
          streetNumber: item.streetNumber,
          street: item.street,
          city: item.city,
          region: item.region,
          postalCode: item.postalCode,
          latitude: item.latitude,
          longitude: item.longitude,
        })
      }
      style={[styles.item, backgroundColor]}
    >
      <Text style={[styles.injury, textColor]}>{item.type}</Text>
      <Text style={[styles.info, textColor]}>{item.breed}</Text>
      <Text style={[styles.info, textColor]}>{item.city}</Text>
    </TouchableOpacity>
  );

  const renderRequest = (request) => {
    return (
      <Item item={request.item} backgroundColor="#000080" textColor="#000000" />
    );
  };

  // if (currentEmergency) {
  //   return (
  //     <SafeAreaView style={styles.listContainer}>
  //       <Text style={styles.title}>Current Emergency</Text>
  //       <Text style={styles.title}>{JSON.stringify(currentEmergency)}</Text>
  //     </SafeAreaView>
  //   );
  // } else {
  //   return (
  //     <SafeAreaView style={styles.listContainer}>
  //       <Text style={styles.title}>Emergencies</Text>
  //       <FlatList
  //         data={requests}
  //         renderItem={renderRequest}
  //         keyExtractor={(item) => item.id}
  //         ItemSeparatorComponent={listSeparator}
  //       />
  //       <Text>{JSON.stringify(currentEmergency)}</Text>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView style={styles.listContainer}>
      <Text style={styles.title}>Emergencies</Text>
      <FlatList
        data={requests}
        renderItem={renderRequest}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={listSeparator}
      />
      <Text>{JSON.stringify(currentEmergency)}</Text>
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  emergencies: store.emergencyState.emergencies,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, clearData, fetchEmergencies }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(EmergencyRequests);

// UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    marginTop: StatusBar.currentUser || 0,
  },
  item: {
    backgroundColor: "lightblue",
    padding: 25,
    marginVertical: 16,
    marginHorizontal: 16,
  },
  info: {
    fontSize: 20,
  },
  injury: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "navy",
    textAlign: "center",
  },
  section: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 0,
    paddingTop: 10,
    marginBottom: 25,
  },
  picker: {
    flex: 1,
    paddingBottom: 80,
  },
  errorContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
  },
  errorTitle: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  formWrapperScroll: {
    flex: 1,
    display: "flex",
    padding: 0,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  formWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  formField: {
    width: "100%",
    alignSelf: "center",
    borderColor: "#444",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingBottom: 20,
  },
  redirectText: {
    textAlign: "center",
    color: "black",
    marginTop: 24,
  },
  loading: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  space: {
    width: 20,
    height: 20,
  },
});
