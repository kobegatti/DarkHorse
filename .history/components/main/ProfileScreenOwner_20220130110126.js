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
    <Text>Hey</Text>
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
});
