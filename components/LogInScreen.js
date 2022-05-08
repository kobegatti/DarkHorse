import { useNavigation } from "@react-navigation/native";
import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { block } from "react-native-reanimated";
import { auth } from "../config/firebase";
const {width, height} = Dimensions.get("screen");

const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setEmail("");
  //       setPassword("");
  //       navigation.navigate("CareX");
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  const handleLogin = () => {
    setIsLoading(true);
    auth
      .signInWithEmailAndPassword(email.trim(), password.trim())
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with: ", user.email);
      })
      .catch((error) => alert(error.message));
    setIsLoading(false);
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Image
          source={require('../assets/Horse.png')}
          resizeMode="center"
          style={styles.image}/>
        <Text
          style={styles.text}>
          Welcome
        </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={email}
          onChangeText={(val) => setEmail(val)}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={password}
          onChangeText={(val) => setPassword(val)}
          maxLength={20}
          secureTextEntry={true}
        />
        <Button
          color="#000080"
          title="Forgot Password"
          disabled={isLoading}
          style={styles.button}
          onPress={() => console.log("Forgot pressed")}
        />
        <View style={{ padding: 8 }}></View>
        <Button 
          color="lightblue" 
          borderColor = "black"
          title="Sign In" 
          style = {styles.button}
          onPress={handleLogin} />

        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate("SignUpScreen")}>
          Don't have account? Click here to sign up
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image:{
    width: 250,
    height: 150,
    marginTop: 100,
    marginBottom: 25,
    marginLeft: "auto",
    marginRight: "auto"   
  },
  text: {
    // marginVertical: 10,
    paddingBottom: 90,
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "Calibri",
  },
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    // flexDirection: "column",
    justifyContent: "center",
    // padding: 35,
    backgroundColor: "#fff",
  },
  inputStyle: {
    borderColor: "black",
    borderRadius: 24,
    borderWidth: 1,
    width: width / 1.3,
    padding: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
  },
  loginText: {
    color: "#000000",
    marginTop: 25,
    textAlign: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    alignItems:"center",
    width: "50%",
    alignSelf:"center",
    borderWidth:5,
    borderColor:"black"
  }
});

export default LogInScreen;