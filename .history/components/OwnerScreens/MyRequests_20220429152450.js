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

const MyRequests = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(props);

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

  useEffect(() => {
    db.collection("Users").doc(auth.currentUser.uid);
  }, []);

  return (
    <SafeAreaView style={styles.listContainer}>
      <Text style={styles.title}>Emergencies</Text>
      <FlatList
        data={[]}
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
