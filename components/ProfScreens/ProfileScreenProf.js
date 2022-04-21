import React, { Component, useState, useEffect } from "react";
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
import { bindActionCreators } from "redux";
import { fetchUser, clearData } from "../../redux/actions/index";
import { auth, db } from "../../config/firebase";
import { connect } from "react-redux";

const ProfileScreenProf = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(props);

  const handleSignOut = () => {
    // turn offline on logout
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .update({ online: false })
      .then(() => console.log("offline now!"));
    auth
      .signOut()
      .then(() => {
        props.navigation.navigate("LogInScreen");
      })
      .catch((error) => alert(error.message));
  };

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
    props.navigation.addListener("focus", () => setLoading(!loading));
  }, [props.navigation, loading]);

  if (!currentUser) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 48 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={require("../../assets/profile.png")}
            size={80}
          />
          {currentUser.online ? (
            <Avatar.Image
              style = {styles.status}
              source={require("../../assets/online.png")}
              size={30}
            />
          ) : (
            <Avatar.Image
              style = {styles.status}
              source={require("../../assets/offline.png")}
              size={30}
            />
          )}
          <View style={{ marginLeft: 20 }}>
            <Title style={(styles.title, { marginTop: 15, marginBottom: 5 })}>
              {currentUser.username}
            </Title >
            <Caption style={styles.caption}>{currentUser.typeOfUser}</Caption>
            <View style={{ flexDirection: "row" }}>
              <Caption style={{ flex: 1, flexWrap: "wrap" }}>
                {/* DummyText Lorem ipsum dolor sit amet, consectetuer adipiscing
                elit. Aenean commodo ligula eget dolor. Aenean m */}
                {currentUser.bio === "" ? "Short Bio Here" : currentUser.bio}
              </Caption>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.userBtnWrapper}>
        <TouchableOpacity
          style={styles.userBtn}
          onPress={() => props.navigation.navigate("EditProfileScreenProf")}
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

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="account-tie" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {currentUser.title === "" ? "Your Title" : currentUser.title}
          </Text>
        </View>

        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {currentUser.location === ""
              ? "Your Location"
              : currentUser.location}
          </Text>
        </View>

        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {currentUser.workPhone === ""
              ? "Phone Number"
              : currentUser.workPhone}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {currentUser.workEmail === ""
              ? "Work Email"
              : currentUser.workEmail}
          </Text>
        </View>
      </View>

      <View>
        <TouchableRipple onPress={() => {}}>
          <View style={{ flexDirection: "row", paddingHorizontal: 30 }}>
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
  bindActionCreators({ fetchUser, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(ProfileScreenProf);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  status: {
    marginTop: 50,
    position: "absolute"
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Calibri",
  },
  bio: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  caption: {
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
    paddingVertical: 15,
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
    marginBottom: 25, //15
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
