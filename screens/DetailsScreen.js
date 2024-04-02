import React from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ImageSlider from "../components/ImageSlider";
import { FontAwesome5 } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const DetailsScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await signOut(auth); // Assuming signOut is an asynchronous function
  };

  const handleBookNow = () => {
    navigation.navigate("BookingScreen"); // Navigate to BookingScreen when Book Now is pressed
  };

  return (
    <View style={styles.container}>
      {/* Arrow icon */}
      <View style={styles.arrowContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ImageSlider />
      <Text style={styles.heading}>
        Shore Excursion- City sightseeing and Suomenlinna from Helsinki Harbors
      </Text>
      <View style={styles.details}>
        <Text style={styles.mainHeading}>OverView</Text>
        <Text style={styles.subHeading}>
          Explore the beautiful city of Helsinki and visit the historic
          Suomenlinna Maritime Fortress on a guided tour. Learn about the
          history of the city and the fortress with a professional guide.
        </Text>
      </View>
      <View style={styles.included}>
        <Text style={styles.includedHeading}>What's Included</Text>
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.option}>
          <Text style={styles.boldText}>English speaking guide</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.boldText}>Pick-up from Harbor</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.boldText}>Guided tour of Suomenlinna</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.boldText}>Food and drinks</Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <TouchableOpacity style={styles.priceButton}>
          <Text style={styles.priceText}>$99</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookNowButton} onPress={handleBookNow}>
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("FinlandScreen")}
            style={styles.btnIcon}
          >
            <FontAwesome5 name="hotel" size={24} color="white" />
            <Text style={{ color: "white" }}>Hotels</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleLogout} style={styles.btnIcon}>
            <Ionicons name="person" size={24} color="white" />
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6b2bff",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    color: "white",
    margin: 12,
  },
  mainHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 1,
    marginBottom: 1,
    color: "#dbc00f",
    margin: 12,
  },
  subHeading: {
    fontSize: 14,
    color: "white",
    margin: 12,
    marginTop: 1,
    marginBottom: 1,
  },
  included: {
    margin: 1,
    padding: 12,
  },
  includedHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#dbc00f",
  },
  boldText: {
    fontWeight: "bold",
    color: "white",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: 15,
    marginTop: 3,
  },
  option: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  priceButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  bookNowButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  priceText: {
    color: "white",
    fontWeight: "bold",
  },
  bookNowText: {
    color: "white",
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    borderTopColor: "#fff",
    borderTopWidth: 1,
  },
  btnIcon: {
    alignItems: "center",
    borderRadius: 20,
  },
  logoutText: {
    color: "white",
  },
  iconContainer: {
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  arrowContainer: {
    position: "absolute",
    top: 40,
    left: 10,
    zIndex: 1,
  },
  backBtn: {
    marginBottom: 10,
    padding: 10,
    marginLeft: 10,
    backgroundColor: "#dbc00f",
    borderRadius: 150,
  },
});

export default DetailsScreen;
