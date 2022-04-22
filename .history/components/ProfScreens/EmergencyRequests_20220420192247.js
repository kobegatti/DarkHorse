import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { auth, db } from "../../config/firebase";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchUser,
  clearData,
  fetchEmergencies,
} from "../../redux/actions/index";

const EmergencyRequests = (props) => {
  //const [requests, setRequests] = useState(props);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(props);
  const [requests, setRequests] = useState([]);

  const Item = ({ request }) => (
    <View style={styles.container}>
      <Text style={styles.title}>{request}</Text>
    </View>
  );

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

  const renderRequest = (request) => {
    console.log(request.item);
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{request.item.breed}</Text>
      </View>
      // <View style={styles.container}>
      //   <Text style={styles.redirectText}>{request.item.type}</Text>
      //   <Text style={styles.redirectText}>{request.item.breed}</Text>
      //   <Text style={styles.redirectText}>
      //     {request.item.accepted ? "Accepted" : "Available"}
      //   </Text>
      // </View>
    );
  };

  useEffect(() => {
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .update({ online: true })
      .then(() => console.log("offline now!"));

    db.collection("Users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setCurrentUser(snapshot.data());
        } else {
          console.log("user does not exist");
        }
      });

    db.collection("Emergencies").onSnapshot((snapshot) => {
      const emergencies = [];
      snapshot.forEach((doc) => {
        emergencies.push({
          accepted: doc.data().accepted,
          breed: doc.data().breed,
          type: doc.data().typeOfEmergency,
          user_id: doc.data().user_id,
          id: doc.id,
        });
      });
      setRequests(emergencies);
    });
    props.navigation.addListener("focus", () => setLoading(!loading));
  }, [props.navigation, loading]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Emergency Requests</Text>
        <View style={styles.section}>
          <FlatList
            data={requests}
            renderItem={renderRequest}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={listSeparator}
          />
        </View>
      </View>
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
  item: {
    backgroundColor: "lightblue",
    padding: 25,
    marginVertical: 16,
    marginHorizontal: 16,
  },
  info: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "navy",
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
