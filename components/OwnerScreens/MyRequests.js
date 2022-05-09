import React, { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { Text, View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchUser,
  clearData,
  fetchEmergencies,
} from "../../redux/actions/index";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";

const MyRequests = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(props);
  const [MyRequests, setMyRequests] = useState([]);

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
    <View
      // onPress={() => props.navigation.navigate("EmergencyInfo")}
      style={[styles.item, backgroundColor]}
    >
      <Text style={[styles.injury, textColor]}>{item.type}</Text>
      <Text style={[styles.info, textColor]}>{item.breed}</Text>
      {item.accepted ? (
        <Text style={[styles.accepted, textColor]}>Accepted</Text>
      ) : (
        <Text style={[styles.not_accepted, textColor]}>Not Accepted</Text>
      )}

      {
        <TouchableOpacity
          style={styles.statusButton}
          onPress={() =>
            props.navigation.navigate("EmergencyInfo", {
              vet_id: item.vet_id,
              type: item.type,
              breed: item.breed,
              accepted: item.accepted,
              emergency_id: item.id,
            })
          }
        >
          <Text style={styles.panelButtonTitle}>Update Status</Text>
        </TouchableOpacity>
      }
    </View>
  );

  const renderRequest = (request) => {
    return (
      <Item item={request.item} backgroundColor="#000080" textColor="#000000" />
    );
  };

  useEffect(() => {
    let isMounted = true;
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .onSnapshot((snapshot) => {
        const requests = [];
        // console.log(snapshot.data().emergencies);
        snapshot.data().emergencies.forEach((e) => {
          requests.push({
            accepted: e.accepted,
            breed: e.breed,
            type: e.type,
            id: e.emergency_id,
            vet_id: e.vet_id,
          });
        });

        setMyRequests(requests);
      });
    props.navigation.addListener("focus", () => setLoading(!loading));
    return () => {
      isMounted = false;
    };
  }, [props.navigation, loading]);

  return (
    <SafeAreaView style={styles.listContainer}>
      <Text style={styles.title}>My Requests</Text>
      <FlatList
        data={MyRequests}
        renderItem={renderRequest}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={listSeparator}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  emergencies: store.emergencyState.emergencies,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, clearData, fetchEmergencies }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(MyRequests);

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
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "green", // FF6347
    alignItems: "center",
    marginTop: 10,
  },
  statusButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "navy", // FF6347
    alignItems: "center",
    marginTop: 10,
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
  accepted: {
    fontSize: 20,
    textAlign: "right",
    color: "green",
  },
  not_accepted: {
    fontSize: 20,
    textAlign: "right",
    color: "maroon",
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
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});
