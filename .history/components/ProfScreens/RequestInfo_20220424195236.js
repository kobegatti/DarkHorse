import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

import { bindActionCreators } from "redux";
import { fetchUser, clearData } from "../../redux/actions/index";

import { auth, db } from "../../config/firebase";
import { connect } from "react-redux";

const RequestInfo = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(props);
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
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

    setType(props.route.params.type);
    setBreed(props.route.params.breed);
    setCity(props.route.params.city);

    props.navigation.addListener("focus", () => setLoading(!loading));
  }, [props.navigation, loading]);

  return (
    <View style={styles.container}>
      <Text>Vet username = {currentUser.username}</Text>
      <Text>{type}</Text>
      <Text>{breed}</Text>
      <Text>{city}</Text>
    </View>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(RequestInfo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    marginBottom: 50,
    paddingBottom: 50,
  },
});
