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
import { auth } from "./config/firebase";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
const Store = createStore(rootReducer, applyMiddleware(thunk));

import LogInOrSignUp from "./components/LogInOrSignUp";
import LogInScreen from "./components/LogInScreen";
import SignUpScreenOwner from "./components/SignUpScreenOwner";
import Dashboard from "./components/Dashboard";
import SignUpProfile from "./components/SignUpProfile";
import SignUpScreenProfessional from "./components/SignUpScreenProfessional";

const Stack = createStackNavigator();

function StackRoutes() {
  return (
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
        name="LogInOrSignUp"
        component={LogInOrSignUp}
        options={{ title: "Welcome" }}
      />
      <Stack.Screen
        name="LogInScreen"
        component={LogInScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="SignUpScreenOwner"
        component={SignUpScreenOwner}
        options={{ title: "Horse Owner Sign Up" }}
      />
      <Stack.Screen
        name="SignUpScreenProfessional"
        component={SignUpScreenProfessional}
        options={{ title: "Horse Professional Sign Up" }}
      />
      <Stack.Screen
        name="SignUpProfile"
        component={SignUpProfile}
        options={{ title: "Sign Up" }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={({ title: "Dashboard" }, { headerLeft: null })}
      />
    </Stack.Navigator>
  );
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    console.log("App executed");
    console.ignoredYellowBox = ["Setting a timer"];
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading</Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <StackRoutes />
        </NavigationContainer>
      );
    }

    return (
      <Provider store={Store}>
        <NavigationContainer>
          <Dashboard />
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
