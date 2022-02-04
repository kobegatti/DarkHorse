import React, { useState, useEffect, useContext } from "react";
import {
  Alert,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import { auth, db } from "../../config/firebase";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const EditProfileScreenOwner = (props) => {
  const [username, setUsername] = useState("");
  const [breeds, setBreeds] = useState("");
  const { currentUser } = props;
  const navigation = useNavigation();

  const handleUpdate = async (props) => {
    console.log("submit");
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("Users")
          .doc(user.uid)
          .update({
            username: username,
            breeds: breeds,
          })
          .then(() => {
            console.log("User Updated!");
            // Alert.alert(
            //   "Profile Updated!",
            //   "Your profile has been updated successfully."
            // );
            console.log(user);
            navigation.navigate("CareX");
          });
      }
    });
  };

  const getUser = () => {
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          // console.log("User Data", documentSnapshot.data());
          // setUserData(documentSnapshot.data());
          setUsername(documentSnapshot.data().username);
          setBreeds(documentSnapshot.data().breeds);
        }
      });
  };

  useEffect(() => {
    getUser();
    console.log(username);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ margin: 20 }}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => {}}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ImageBackground
                  source={require("../../assets/profile.png")}
                  style={{ height: 100, width: 100 }}
                  imageStyle={{ borderRadius: 15 }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#fff",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.action}>
            <FontAwesome name="user-o" size={20} />
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInput}
              value={username}
              onChangeText={(val) => setUsername(val)}
            />
          </View>

          <View style={styles.action}>
            <Icon name="information-outline" size={20} />
            <TextInput
              placeholder="Horse Breeds Owned"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInput}
              value={breeds}
              onChangeText={(val) => setBreeds(val)}
            />
          </View>

          <TouchableOpacity
            style={styles.commandButton}
            onPress={() => handleUpdate()}
          >
            <Text style={styles.panelButtonTitle}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(EditProfileScreenOwner);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#000080",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  breedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonView: {
    flexDirection: "row",
  },
  breedInput: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    margin: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
