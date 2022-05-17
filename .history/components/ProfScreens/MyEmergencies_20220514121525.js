import React, { useEffect, useState } from "react";
import {
  Flatlist,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../../config/firebase";

import { bindActionCreators } from "redux";
import { fetchUser, clearData } from "../../redux/actions/index";
import { connect } from "react-redux";

const MyEmergencies = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(props);
  const [appointments, setAppointments] = useState([]);

  const Item = ({ item, backgroundColor, textColor }) => (
    <TouchableOpacity
      onPress={() => props.navigation.navigate("Map")}
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
    let isMounted = true;

    db.collection("Users")
      .doc(auth.currentUser.uid)
      .onSnapshot(
        (snapshot) => {
          const current_appointments = [];
          if (snapshot.exists) {
            setCurrentUser(snapshot.data());

            snapshot.data().appointments.forEach((a) => {
              console.log(a);
              current_appointments.push(a);
            });
          } else {
            console.log("user does not exist");
          }
        },
        (error) => {
          console.log(error.message);
        }
      );

    return () => {
      isMounted = false;
    };
  }, [props.navigation, loading]);

  return (
    <SafeAreaView style={styles.listContainer}>
      <Text style={styles.title}>My Appointments</Text>
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(MyEmergencies);

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: StatusBar.currentUser || 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "navy",
    textAlign: "center",
  },
});
