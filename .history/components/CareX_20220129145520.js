import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../config/firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions/index";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ProfileScreenOwner from "./main/ProfileScreenOwner";
import ProfileScreenProf from "./main/ProfileScreenProf";
import MapScreen from "./main/MapScreen";

const Tab = createMaterialBottomTabNavigator();

export class CareX extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        this.props.navigation.navigate("LogInScreen");
      })
      .catch((error) => alert(error.message));
  };

  render() {
    const { currentUser } = this.props;
    // let Profile =
    //   currentUser.typeOfUser == "Horse Owner"
    //     ? { ProfileScreenOwner }
    //     : { ProfileScreenProf };
    console.log(currentUser.data());
    return (
      <Tab.Navigator initialRouteName="Map" labeled={false}>
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="map-marker"
                color={color}
                size={26}
              ></MaterialCommunityIcons>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreenOwner}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
                size={26}
              ></MaterialCommunityIcons>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
// {/* <Text>Email: {auth.currentUser?.email}</Text> */}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(CareX);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "lightblue",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
