import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import * as Location from "expo-location";
import { auth, db } from "../../config/firebase";

import { bindActionCreators } from "redux";
import { fetchUser, clearData } from "../../redux/actions/index";
import { connect } from "react-redux";

const MyEmergencies = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(props);
  const [appointments, setAppointments] = useState([]);
  const [city, setCity] = useState("");
  const [isMounted, setIsMounted] = useState(true);
  const [hasError, setHasError] = useState(false);

  const Item = ({ item, backgroundColor, textColor }) => (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("AppointmentInfo", {
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

  // location info
  const findCity = async (latitude, longitude) => {
    try {
      const place = await Location.reverseGeocodeAsync({
        latitude: latitude,
        longitude: longitude,
      });

      let city;
      place.find((p) => {
        city = p.city;
        setCity(p.city);
      });
      console.log("city = " + city);
    } catch (error) {
      console.log(error);
    }
    console.log("city = " + city);
    setIsMounted(false);
  };

  useEffect(() => {
    // let isMounted = true;

    db.collection("Users")
      .doc(auth.currentUser.uid)
      .onSnapshot(
        (snapshot) => {
          const current_appointments = [];
          if (snapshot.exists) {
            setCurrentUser(snapshot.data());

            snapshot.data().appointments.forEach((a) => {
              findCity(a.latitude, a.longitude);
              current_appointments.push({
                accepted: a.accepted,
                breed: a.breed,
                type: a.type,
                emergency_id: a.id,
                vet_id: a.vet_id,
                city: city,
              });
              console.log(current_appointments);
            });

            setAppointments(current_appointments);
          } else {
            console.log("user does not exist");
          }
        },
        (error) => {
          console.log(error.message);
        }
      );

    return () => {
      isMounted;
    };
  }, [props.navigation, loading, isMounted]);

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

  return (
    <SafeAreaView style={styles.listContainer}>
      <Text style={styles.title}>My Appointments</Text>
      <FlatList
        data={appointments}
        renderItem={renderRequest}
        keyExtractor={(item) => item.emergency_id}
        ItemSeparatorComponent={listSeparator}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(MyEmergencies);

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
