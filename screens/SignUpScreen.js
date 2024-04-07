import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      console.log(
        "User signed up and name set: ",
        userCredential.user.displayName
      );
    } catch (err) {
      console.log("Error in SignUp", err.message);
    }
  };

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
          <Text style={styles.emailtxt}>Full Name</Text>
          <TextInput
            style={styles.emailinput}
            placeholder="Maxwell Gery"
            value={name}
            onChangeText={(value) => setName(value)}
          />
          <Text style={styles.emailtxt}>Email Address</Text>
          <TextInput
            style={styles.emailinput}
            placeholder="max@gmail.com"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <Text style={styles.emailtxt}>Password</Text>
          <TextInput
            style={styles.emailinput}
            placeholder="********"
            secureTextEntry={true}
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <View style={styles.containsignup}>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.txtsignup}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Already have an account? */}
        <View style={styles.containlogin}>
          <Text style={styles.text}>Already have an account?</Text>
          <TouchableOpacity
            style={styles.loginlink}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.txtlogin}>Log in</Text>
          </TouchableOpacity>
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
  forgotLink: {
    marginTop: 10,
  },
  forgotTxt: {
    color: "#6b2bff",
    textAlign: "right",
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

  containlogin: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  text: {
    color: "#000",
  },
  loginlink: {
    marginLeft: 5,
  },
  txtlogin: {
    color: "#6b2bff",
    fontWeight: "bold",
  },
};

export default SignUpScreen;
