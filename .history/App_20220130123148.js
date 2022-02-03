import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  SafeAreaView,
  Alert,
  Button,
  Platform,
  StatusBar,
} from "react-native";
import { auth, db } from "./config/firebase";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));

import LogInScreen from "./components/LogInScreen";
import SignUpScreen from "./components/SignUpScreen";
import EditProfileScreenOwner from "./components/EditProfileScreenOwner";
import EditProfileScreenProf from "./components/EditProfileScreenProf";
import CareX from "./components/CareX";
import { Dimensions } from "react-native";
import { user } from "./redux/reducers/user";
import CareXProf from "./components/CareXProf";

const dimensions = Dimensions.get("window");
const imageHeight = (dimensions.height * 9) / 16;
const imageWidth = dimensions.width;
const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      type: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
          type: "",
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
        db.collection("Users")
          .doc(user.uid)
          .get()
          .then((profile) => {
            if (profile.exists) {
              console.log(profile.data().typeOfUser);
              console.log("user exists");
              this.setState({ type: profile.data().typeOfUser });
              console.log(type);
            } else {
              console.log("user does not exists");
            }
          });
      }
    });
  }

  render() {
    console.log("App executed");
    const { loggedIn, loaded } = this.state;
    while (!loaded) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            resizeMode={"contain"}
            style={{ width: imageWidth, height: imageHeight }}
            source={require("./assets/logo.png")}
          />
        </View>
      );
    }

    if (this.state.type !== "Horse Owner") {
      return (
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="CareXProf">
              <Stack.Screen
                name="LogInScreen"
                component={LogInScreen}
                options={{ title: "Login" }}
              />
              <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{ title: "Sign Up" }}
              />
              <Stack.Screen
                name="CareX"
                component={CareXProf}
                options={{
                  headerTitle: "CareX",
                  headerBackTitleVisible: false,
                  headerTitleAlign: "center",
                  headerStyle: {
                    backgroundColor: "#fff",
                    shadowColor: "#fff",
                    elevation: 0,
                  },
                }}
              />
              <Stack.Screen
                name="EditProfileScreenProf"
                component={EditProfileScreenProf}
                options={{
                  headerTitle: "Edit Profile",
                  headerBackTitleVisible: false,
                  headerTitleAlign: "center",
                  headerStyle: {
                    backgroundColor: "#fff",
                    shadowColor: "#fff",
                    elevation: 0,
                  },
                }}
              />
              {/* <Stack.Screen name="LogInScreen" component={LogInScreen} /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="LogInScreen"
            screenOptions={{
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#000000", // header color
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "normal",
              },
            }}
          >
            <Stack.Screen
              name="LogInScreen"
              component={LogInScreen}
              options={{ title: "Login" }}
            />
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{ title: "Sign Up" }}
            />
            <Stack.Screen
              name="CareX"
              component={CareX}
              options={{
                headerTitle: "CareX",
                headerBackTitleVisible: false,
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: "#fff",
                  shadowColor: "#fff",
                  elevation: 0,
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="CareX">
            <Stack.Screen
              name="LogInScreen"
              component={LogInScreen}
              options={{ title: "Login" }}
            />
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{ title: "Sign Up" }}
            />
            <Stack.Screen
              name="CareX"
              component={CareX}
              options={{
                headerTitle: "CareX",
                headerBackTitleVisible: false,
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: "#fff",
                  shadowColor: "#fff",
                  elevation: 0,
                },
              }}
            />
            <Stack.Screen
              name="EditProfileScreenOwner"
              component={EditProfileScreenOwner}
              options={{
                headerTitle: "Edit Profile",
                headerBackTitleVisible: false,
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: "#fff",
                  shadowColor: "#fff",
                  elevation: 0,
                },
              }}
            />
            {/* <Stack.Screen name="LogInScreen" component={LogInScreen} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;

const containerStyle = { backgroundColor: "lightblue" };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
