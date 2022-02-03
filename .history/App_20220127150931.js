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
const store = createStore(rootReducer, applyMiddleware(thunk));

import LogInScreen from "./components/LogInScreen";
import SignUpScreenOwner from "./components/SignUpScreenOwner";
import SignUpProfile from "./components/SignUpProfile";
import SignUpScreenProfessional from "./components/SignUpScreenProfessional";
import CareX from "./components/CareX";
import { Dimensions } from "react-native";

const dimensions = Dimensions.get("window");
const imageHeight = (dimensions.height * 9) / 16;
const imageWidth = dimensions.width;
const Stack = createStackNavigator();

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
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            resizeMode={"cover"}
            style={{ width: "100%", height: 400 }}
            source={require("./assets/logo.png")}
          />
        </View>
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
              // options={({ title: "Main" }, { headerLeft: null })}
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
              // options={({ title: "Main" }, { headerLeft: null })}
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
