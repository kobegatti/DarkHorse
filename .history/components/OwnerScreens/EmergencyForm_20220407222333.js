import React from "react";
import { Text, StyleSheet } from "react-native";

export default function EmergencyForm() {
  return (
    <ScrollView style={styles.formWrapperScroll}>
      <View style={styles.formWrapper}>
        <Picker
          selectedValue={typeOfUser}
          onValueChange={(val) => setTypeOfUser(val)}
          style={styles.picker}
        >
          <Picker.Item
            style={{ fontWeight: "light" }}
            label="Please select an option"
            value=""
          />
          <Picker.Item label="Horse Owner" value="Horse Owner" />
          <Picker.Item
            label="Horse Care Professional"
            value="Horse Care Professional"
          />
        </Picker>
        <TextInput
          style={styles.formField}
          placeholder="Full Name"
          value={username}
          onChangeText={(val) => setUsername(val)}
        />
        <TextInput
          style={styles.formField}
          placeholder="Email"
          value={email}
          onChangeText={(val) => setEmail(val)}
        />
        <TextInput
          style={styles.formField}
          placeholder="Password"
          value={password}
          onChangeText={(val) => setPassword(val)}
          maxLength={20}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.formField}
          placeholder="Password Confirmation"
          value={passwordConfirm}
          onChangeText={(val) => setPasswordConfirm(val)}
          maxLength={20}
          secureTextEntry={true}
        />

        <View style={styles.space}></View>

        <Button
          color="lightblue"
          title="Sign Up"
          disabled={isLoading}
          onPress={() => handleSignUp()}
        />

        <Text
          style={styles.redirectText}
          onPress={() => navigation.navigate("LogInScreen")}
        >
          Already have an account? Log In
        </Text>
      </View>
    </ScrollView>
  );
}

// UI
const styles = StyleSheet.create({
  picker: {
    flex: 1,
    paddingBottom: 80,
  },
  errorContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
  },
  errorTitle: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  formWrapperScroll: {
    flex: 1,
    display: "flex",
    padding: 0,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  formWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  formField: {
    width: "100%",
    alignSelf: "center",
    borderColor: "#444",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingBottom: 20,
  },
  redirectText: {
    textAlign: "center",
    color: "black",
    marginTop: 24,
  },
  loading: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  space: {
    width: 20,
    height: 20,
  },
});
