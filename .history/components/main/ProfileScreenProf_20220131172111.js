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
import { auth, db } from "../../config/firebase";
import { connect } from "react-redux";

const ProfileScreen = (props) => {
  const [name, setName] = useState("");
  const [typeOfUser, setTypeOfUser] = useState("");
  const [loading, setLoading] = useState(true);
  // const { currentUser } = props;
  // console.log({ currentUser });
  const getUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("Users")
          .doc(user.uid)
          .get()
          .then((documentSnapshot) => {
            if (documentSnapshot.exists) {
              // console.log("User Data", documentSnapshot.data());
              // setUserData(documentSnapshot.data());
              setName(documentSnapshot.data().username);
              setTypeOfUser(documentSnapshot.data().typeOfUser);
              setTypeOfUser(documentSnapshot.data().typeOfUser);
            }
          });
      }
    });
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
    getUser();
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
              {name}
            </Title>
            <Caption style={styles.caption}>{typeOfUser}</Caption>
            <View style={{ flexDirection: "row" }}>
              <Caption style={{ flex: 1, flexWrap: "wrap" }}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec qu
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
            Title placed here
          </Text>
        </View>

        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            Location placed here
          </Text>
        </View>

        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            Work phone placed here
          </Text>
        </View>

        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            Email placed here
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Icon name="web" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            Website/SocialMedia placed here
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

export default connect(mapStateToProps, null)(ProfileScreen);

// const mapStateToProps = (store) => ({
//   currentUser: store.userState.currentUser,
// });

// const mapDispatchProps = (dispatch) =>
//   bindActionCreators({ fetchUser }, dispatch);

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
