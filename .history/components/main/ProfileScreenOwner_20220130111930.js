import React, { Component } from "react";
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
import { auth } from "../../config/firebase";
import { connect } from "react-redux";

const ProfileScreen = (props) => {
  const { currentUser } = props;
  // console.log({ currentUser });
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        props.navigation.navigate("LogInScreen");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image source={require("../../assets/logo.png")} size={80} />
          <View style={{ marginLeft: 20 }}>
            <Title style={(styles.title, { marginTop: 15, marginBottom: 5 })}>
              John Doe
            </Title>
            <Caption style={styles.caption}>This is a description.</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
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
            Location placed here
          </Text>
        </View>
      </View>
    </SafeAreaView>
    // <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    //   <ScrollView
    //     style={styles.container}
    //     contentContainerStyle={{
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //     showsVerticalScrollIndicator={false}
    //   >
    //     <Text style={styles.userName}>{currentUser.typeOfUser}</Text>
    //     <Image
    //       style={styles.userImg}
    //       source={require("../../assets/logo.png")}
    //     />
    //     <Text style={styles.userName}>{currentUser.username}</Text>
    //     <Text style={styles.aboutUser}>
    //       OWNER PROFILE: This is a description area where you can write about
    //       yourself.
    //     </Text>

    //     <View style={styles.userBtnWrapper}>
    //       <TouchableOpacity
    //         style={styles.userBtn}
    //         onPress={() => props.navigation.navigate("EditProfileScreen")}
    //       >
    //         <Text style={styles.userBtnTxt}>Edit</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         style={styles.userBtn}
    //         onPress={() => handleSignOut()}
    //       >
    //         <Text style={styles.userBtnTxt}>Sign Out</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
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
});
