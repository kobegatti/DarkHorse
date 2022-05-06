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
import FontAwesome from "react-native-vector-icons/FontAwesome";

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
              style={styles.status}
              source={require("../../assets/online.png")}
              size={30}
            />
          ) : (
            <Avatar.Image
              style={styles.status}
              source={require("../../assets/offline.png")}
              size={30}
            />
          )}
          <View style={{ marginLeft: 20 }}>
            <Title style={(styles.title, { marginTop: 15, marginBottom: 5 })}>
              {currentUser.username}
            </Title>
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
          <FontAwesome name="id-badge" color="#183153" size={30} />
          <Text style={styles.text}>
            {currentUser.title === "" ? "Your Title" : currentUser.title}
          </Text>
        </View>

        <View style={styles.row}>
          <FontAwesome name="compass" color="#183153" size={30} />
          <Text style={styles.text}>
            {currentUser.location === ""
              ? "Your Location"
              : currentUser.location}
          </Text>
        </View>

        <View style={styles.row}>
          <FontAwesome name="phone" color="#183153" size={30} />
          <Text style={styles.text}>
            {currentUser.workPhone === ""
              ? "Phone Number"
              : currentUser.workPhone}
          </Text>
        </View>

        {/* <input onkeydown="phoneNumberFormatter()" id="phone-number" />

        <script>
          function formatPhoneNumber(value) {
            if (!value) return value;
            const phoneNumber = value.replace(/[^\d]/g, '');
            const phoneNumberLength = phoneNumber.length;

            if (phoneNumberLength < 4) return phoneNumber;
            if (phoneNumberLenght < 7) {
              return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
            }
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
              3,
              6,
              )}-${phoneNumber.slice(6,9)}`;
          }

          function phoneNumberFormatter() {
            const inputField = document.getElementById('phone-number');
            const formattedInputValue = formatPhoneNumber(inputField.value);
            inputField.value = formattedInputValue;
          }
        </script> */}

        <View style={styles.row}>
          <FontAwesome name="envelope" color="#183153" size={30} />
          <Text style={styles.text}>
            {currentUser.workEmail === ""
              ? "Work Email"
              : currentUser.workEmail}
          </Text>
        </View>
      </View>

      <View>
        <TouchableRipple onPress={() => {}}>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 30,
              marginVertical: 12.5,
            }}
          >
            <FontAwesome name="gear" color="#183153" size={30} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View>

      <View>
        <TouchableRipple onPress={() => handleSignOut()}>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 30,
              marginVertical: 12.5,
            }}
          >
            <Icon name="logout" color="#183153" size={30} />
            <Text style={styles.menuItemText}>Logout</Text>
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
    position: "absolute",
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
    marginBottom: 15,
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
  text: {
    color: "#183153",
    marginLeft: 20,
    // marginBottom: 25,
    // alignItems: 'center',
    // fontWeight: "bold",
    fontFamily: "Arial",
    fontSize: 15,
    alignSelf: "center",
  },
  userBtnTxt: {
    color: "#2e64e5",
  },
});
