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
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const auth = getAuth();
  // signInWithPopup(auth, provider)
  //   .then((result) => {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;
  //     // The signed-in user info.
  //     const user = result.user;
  //     // IdP data available using getAdditionalUserInfo(result)
  //     // ...
  //   })
  //   .catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.customData.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //   });

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.log("Error in Login", err.message);
      }
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
          <TouchableOpacity
            style={styles.forgotLink}
            onPress={() => navigation.navigate("PasswordRecovery")}
          >
            <Text style={styles.forgotTxt}>Forgot Password?</Text>
          </TouchableOpacity>
          <View style={styles.containsignup}>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.txtsignup}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.opt}> Or </Text>
        <TouchableOpacity style={styles.googleSignin}>
          <Image
            source={require("../assets/google.jpg")}
            style={{ width: 50, height: 50 }}
          ></Image>
        </TouchableOpacity>
        {/* Already have an account? */}
        <View style={styles.containlogin}>
          <Text style={styles.text}>Already have an account?</Text>
          <TouchableOpacity
            style={styles.loginlink}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.txtlogin}>Sign Up</Text>
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
    width: 200,
    height: 200,
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
    color: "#171717",
    fontWeight: "bold",
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
  opt: {
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
  googleSignin: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f4f2",
    borderRadius: 8,
    width: 60,
    alignSelf: "center",
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
    color: "#171717",
    fontWeight: "bold",
  },
};

export default LoginScreen;
