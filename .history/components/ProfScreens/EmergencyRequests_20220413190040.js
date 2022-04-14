import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { auth, db } from "../../config/firebase";

export default function EmergencyRequests(props) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(props);
  const [requests, setRequests] = useState([]);

  var emergency_data = [];

  useEffect(() => {
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setCurrentUser(snapshot.data());
          setRequests(snapshot.data().requests);
          console.log("requests = " + requests);
          console.log("firebase = " + snapshot.data().requests);

          //console.log(snapshot.data().requests);
          // snapshot.data().requests.forEach((request) => {
          //   console.log();
          //   emergency_data.push(<Text>{request.typeOfEmergency}</Text>);
          // });
        } else {
          console.log("user does not exist");
        }
      });
    props.navigation.addListener("focus", () => setLoading(!loading));

    console.log("emergency_data = " + emergency_data);
  }, [props.navigation, loading]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Emergency Requests</Text>
        <View style={styles.section}>{emergency_data}</View>
      </View>
    </SafeAreaView>
  );
}

// UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
