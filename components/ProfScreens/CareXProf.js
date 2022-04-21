import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../../config/firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, clearData } from "../../redux/actions/index";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


import ProfileScreenProf from "./ProfileScreenProf";
import MapScreenProf from "./MapScreenProf";
import EmergencyRequests from "./EmergencyRequests";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const Tab = createMaterialBottomTabNavigator();

export class CareXProf extends Component {
  componentDidMount() {
    this.props.clearData();
    this.props.fetchUser();
  }
  componentWillUnmount() {
    this.props.clearData();
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
    // const { currentUser } = this.props;
    return (
      <Tab.Navigator initialRouteName="Map" labeled={false}>
        <Tab.Screen
          name="EmergencyRequests"
          component={EmergencyRequests}
          options={{
            tabBarIcon: ({ color, size }) => (
              // <MaterialCommunityIcons
              //   name="account-alert"
              //   color={color}
              //   size={26}
              // ></MaterialCommunityIcons>
              <FontAwesome5
                name="hospital-user"
                color={color}
                size={26}
              ></FontAwesome5>
            ),
          }}
        />

        <Tab.Screen
          name="Map"
          component={MapScreenProf}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5
                name="map-marker-alt"
                color={color}
                size={26}
              ></FontAwesome5>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreenProf}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5
                name="user"
                color={color}
                size={26}
              ></FontAwesome5>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(CareXProf);

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
