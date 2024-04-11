import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cover}>
        <Text style={styles.txthead}>BookaStay!</Text>

        <View style={styles.cotainImg}>
          <Image
            source={require("../assets/book.jpg")}
            style={{ width: 300, height: 300, borderRadius: 150 }}
          />
        </View>
        <View style={styles.containBtn}>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.txtBtn}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containlink}>
          <Text style={styles.txtdisc}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.txtlink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  cover: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "25%",
    marginBottom: 16,
  },
  txthead: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  cotainImg: {
    width: 300,
    height: 300,
    backgroundColor: "#fff",
    borderRadius: 150,
    alignSelf: "center",
    marginTop: "15%",
    marginBottom: "15%",
  },
  containBtn: {
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#fde047",
    marginLeft: 28,
    marginRight: 28,
    borderRadius: 8,
  },
  txtBtn: {
    color: "#000",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  containlink: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "5%",
  },
  txtdisc: {
    color: "#fff",
    fontSize: 16,
  },
  txtlink: {
    color: "#fde047",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
