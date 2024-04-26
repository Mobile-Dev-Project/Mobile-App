import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import Booked from "./Booked";
import FinlandScreen from "./FinlandScreen";

const BookingConfirm = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.headTxt}>Booking Confirmed!</Text>
        <AntDesign
          style={styles.icon}
          name="checkcircle"
          size={44}
          color="#f5d507"
        />
        <Text style={styles.txt}>Thank you for booking with us! 😊</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Feather name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("FinlandScreen")}>
          <FontAwesome5 name="hotel" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Booked")}>
          <AntDesign name="key" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#171717",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headTxt: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#ccc",
  },
  icon: {
    alignSelf: "center",
  },
  txt: {
    fontSize: 20,
    color: "#ccc",
    marginTop: 10,
  },
  footer: {
    backgroundColor: "#fde047",
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default BookingConfirm;
