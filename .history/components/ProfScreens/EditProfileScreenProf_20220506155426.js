import React, { createRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import BottomSheet from "reanimated-bottom-sheet";
import { bindActionCreators } from "redux";
import { fetchUser, clearData } from "../../redux/actions/index";

import { auth, db } from "../../config/firebase";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const EditProfileScreenProf = (props) => {
  const { currentUser } = props;
  const [username, setUsername] = useState(currentUser.username);
  const [title, setTitle] = useState(currentUser.title);
  const [bio, setBio] = useState(currentUser.bio);
  const [location, setLocation] = useState(currentUser.location);
  const [workPhone, setWorkPhone] = useState(currentUser.workPhone);
  const [workEmail, setWorkEmail] = useState(currentUser.workEmail);
  const navigation = useNavigation();

  const handleUpdate = async (props) => {
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .update({
        username: username,
        title: title,
        bio: bio,
        location: location,
        workPhone: workPhone,
        workEmail: workEmail,
      })
      .then(() => {
        console.log("User Updated!");
        // Alert.alert(
        //   "Profile Updated!",
        //   "Your profile has been updated successfully."
        // );
        navigation.navigate("CareXProf");
      });
  };

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

          <View style={styles.fullName}>
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
            <Icon name="account-tie-outline" size={20} />
            <TextInput
              placeholder="Title"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInput}
              value={title}
              onChangeText={(val) => setTitle(val)}
            />
          </View>

          <View style={styles.action}>
            <Icon name="information-outline" size={20} />
            <TextInput
              placeholder="Bio"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInput}
              value={bio}
              maxLength={250} // sets the max character limit for Bio
              onChangeText={(val) => setBio(val)}
            />
          </View>

          <View style={styles.action}>
            <FontAwesome name="globe" size={20} />
            <TextInput
              placeholder="Location"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInput}
              value={location}
              onChangeText={(val) => setLocation(val)}
            />
          </View>

          <View style={styles.action}>
            <Feather name="phone" size={20} />
            <TextInput
              placeholder="Work Phone"
              placeholderTextColor="#666666"
              keyboardType="number-pad"
              autoCorrect={false}
              style={styles.textInput}
              value={workPhone}
              onChangeText={(val) => setWorkPhone(val)}
            />
          </View>

          <View style={styles.action}>
            <FontAwesome name="envelope-o" size={20} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInput}
              value={workEmail}
              onChangeText={(val) => setWorkEmail(val)}
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

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, clearData }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchProps
)(EditProfileScreenProf);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#000080", // FF6347
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
    backgroundColor: "#000080", //FF6347
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
    marginTop: 8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 3,
  },
  fullName: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 3,
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
});
