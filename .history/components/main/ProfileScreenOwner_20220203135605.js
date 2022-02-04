import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { auth, db } from "../../config/firebase";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../redux/actions/index";
import { connect } from "react-redux";

const ProfileScreenOwner = (props) => {
  // const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [typeOfUser, setTypeOfUser] = useState("");
  const [breeds, setBreeds] = useState("");
  const [loading, setLoading] = useState(true);
  const { currentUser } = props;

  const getUser = () => {
    console.log("currentUser = ", currentUser);
    // auth.onAuthStateChanged((user) => {
    //   console.log("current User = ", currentUser);
    //   if (user) {
    //     db.collection("Users")
    //       .doc(user.uid)
    //       .get()
    //       .then((documentSnapshot) => {
    //         if (documentSnapshot.exists) {
    //           // console.log("User Data", documentSnapshot.data());
    //           // setUserData(documentSnapshot.data());
    //           setName(documentSnapshot.data().username);
    //           setTypeOfUser(documentSnapshot.data().typeOfUser);
    //           setBreeds(documentSnapshot.data().breeds);
    //         }
    //       });
    //   }
    // });
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        props.navigation.navigate("LogInScreen");
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    // getUser();
    props.navigation.addListener("focus", () => setLoading(!loading));
  }, [props.navigation, loading]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={require("../../assets/profile.png")}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={(styles.title, { marginTop: 15, marginBottom: 5 })}>
              {currentUser.username}
            </Title>
            <Caption style={styles.caption}>{currentUser.typeOfUser}</Caption>
            <View style={{ height: 5 }}></View>
            <Caption style={styles.caption}>Breeds:</Caption>
            <Caption style={styles.caption}>
              {currentUser.breeds ? currentUser.breeds : "No breeds listed"}
            </Caption>
          </View>
        </View>
      </View>

      <View style={styles.userBtnWrapper}>
        <TouchableOpacity
          style={styles.userBtn}
          onPress={() => props.navigation.navigate("EditProfileScreenOwner")}
        >
          <Text style={styles.userBtnTxt}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.userBtn}
          onPress={() => handleSignOut()}
        >
          <Text style={styles.userBtnTxt}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#4169e1" size={25} />
            <Text style={styles.menuItemText}>
              Favorite Horse Care Professionals
            </Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#4169e1" size={25} />
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="cog-outline" color="#4169e1" size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(ProfileScreenOwner);

// const mapStateToProps = (store) => ({
//   currentUser: store.userState.currentUser,
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    justifyContent: "center",
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 11, //15
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  userBtn: {
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: "#2e64e5",
  },
});
