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
  const [city, setCity] = useState("");
  const [currentEmergency, setCurrentEmergency] = useState(null);
  const [onCall, setOnCall] = useState(null);
  const [isOnline, setIsOnline] = useState(null);

  // location info
  const findCity = async (latitude, longitude) => {
    const place = await Location.reverseGeocodeAsync({
      latitude: latitude,
      longitude: longitude,
    });

    let city;
    place.find((p) => {
      city = p.city;
      setCity(p.city);
    });
  };

  useEffect(() => {
    // Get Current User
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          setCurrentUser(snapshot.data());
          setCurrentEmergency(snapshot.data().emergency);
          setOnCall(snapshot.data().onCall);
        } else {
          console.log("user does not exist");
        }
      });

    // Set status to online
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .update({ online: true })
      .then(() => console.log("online = " + isOnline));

    // Get Emergencies
    db.collection("Emergencies").onSnapshot((snapshot) => {
      const emergencies = [];
      snapshot.forEach((doc) => {
        findCity(doc.data().latitude, doc.data().longitude);
        // setUserID(doc.data().user_id);
        // setEmergencyId(doc.id);
        emergencies.push({
          accepted: doc.data().accepted,
          breed: doc.data().breed,
          type: doc.data().typeOfEmergency,
          user_id: doc.data().user_id,
          id: doc.id,
          vet_id: doc.data().vet_id,
          city: city,
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
          city: item.city,
          latitude: item.latitude,
          longitude: item.longitude,
          user_id: item.user_id,
          emergency_id: item.id,
          vet_id: item.vet_id,
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

  // if (onCall) {
  //   return (
  //     <SafeAreaView>
  //       <Text style={styles.emergency_title}>Accepted Emergency</Text>
  //       <TouchableOpacity
  //         style={styles.box}
  //         onPress={() => props.navigation.navigate("Map")}
  //       >
  //         {/* <Text style={styles.title}>{JSON.stringify(currentEmergency)}</Text> */}
  //         <Text style={styles.text_title}>Type</Text>
  //         <Text style={styles.text_content}>{currentEmergency.type}</Text>
  //         <Text style={styles.text_title}>Breed</Text>
  //         <Text style={styles.text_content}>{currentEmergency.breed}</Text>
  //         <Text style={styles.text_title}>Location</Text>
  //         <Text style={styles.text_content}>{currentEmergency.city}</Text>
  //         {/* <Text style={styles.text_content}>{userID}</Text> */}
  //       </TouchableOpacity>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView style={styles.listContainer}>
      <Text style={styles.title}>Available Emergencies</Text>
      <FlatList
        data={requests}
        renderItem={renderRequest}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={listSeparator}
      />
      {/* <Text>{JSON.stringify(currentEmergency)}</Text> */}
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
  box: {
    alignItems: "center",
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    color: "#666",
    backgroundColor: "lightblue",
  },
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
  emergency_title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "maroon",
    textAlign: "center",
  },
  section: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 0,
    paddingTop: 10,
    marginBottom: 25,
  },
  text_title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "navy",
  },
  text_content: {
    fontSize: 24,
    marginBottom: 13,
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
