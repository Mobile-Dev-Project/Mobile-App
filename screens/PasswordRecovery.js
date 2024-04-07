import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";

const PasswordRecovery = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Input Required", "Please enter your email address");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      Alert.alert(
        "Check Your Inbox",
        "Password reset email sent. Please check your inbox."
      );
    } catch (err) {
      console.error("Error sending password reset email:", err.message);
      Alert.alert(
        "Error",
        "Failed to send password reset email. Please try again."
      );
    }
  };

  const handleSignUp = async () => {};
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.cover}>
          <TouchableOpacity
            style={styles.arrowBtn}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftIcon style={{ color: "#171717" }} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={styles.smscreen}>
        <View style={styles.smcover}>
          <Text style={styles.emailtxt}>Email Address</Text>
          <TextInput
            style={styles.emailinput}
            placeholder="max@gmail.com"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <View style={styles.containsignup}>
            <TouchableOpacity onPress={handlePasswordReset}>
              <Text style={styles.txtsignup}>Send Reset Emai</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  safeContainer: {
    display: "flex",
  },
  cover: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "25%",
    marginBottom: 12,
  },
  arrowBtn: {
    position: "absolute",
    top: -70,
    left: 20,
    backgroundColor: "#fcfcfc",
    padding: 10,
    borderRadius: 50,
  },
  containImg: {
    backgroundColor: "#6b2bff",
    alignSelf: "center",
    marginBottom: "10%",
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 150,
  },
  smscreen: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  smcover: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "5%",
    marginBottom: 12,
  },
  emailtxt: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  emailinput: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginTop: 10,
  },
  containsignup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  txtsignup: {
    color: "#000",
    backgroundColor: "#fde047",
    padding: 10,
    borderRadius: 8,
    width: 300,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default PasswordRecovery;
