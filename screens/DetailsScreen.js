import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ImageSlider from "../components/ImageSlider";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const DetailsScreen = ({ navigation, route }) => {
  const handleLogout = async () => {
    await signOut(auth); // Assuming signOut is an asynchronous function
  };

  const { destination } = route.params;
  const { name, location, image, rating, description } = destination;

  // Function to render rating stars
  // Function to render star icons based on rating
  const renderRatingStars = () => {
    const rating = parseFloat(destination.rating); // Parse rating to float
    const stars = [];
    for (let i = 0; i < 5; i++) {
      // Iterate 5 times for 5 stars
      if (i < Math.floor(rating)) {
        // Render filled star if index is less than rating
        stars.push(
          <FontAwesome name="star" size={10} color="#f5d507" key={i} />
        );
      } else {
        // Render empty star if index is greater than or equal to rating
        stars.push(
          <FontAwesome name="star-o" size={10} color="#f5d507" key={i} />
        );
      }
    }
    return stars;
  };

  const handleBookNow = () => {
    navigation.navigate("SelectRoomScreen"); // Navigate to BookingScreen when Book Now is pressed
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
      <ImageSlider images={image} />
      <Text style={styles.heading}>
        {name} - {location} - {rating}
        <View style={{ flexDirection: "row" }}>{renderRatingStars()}</View>
      </Text>

      <View style={styles.details}>
        <Text style={styles.mainHeading}>OverView</Text>
        <Text style={styles.subHeading}>{description}</Text>
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
        <TouchableOpacity style={styles.bookNowButton} onPress={handleBookNow}>
          <Text style={styles.bookNowText}>Select Room</Text>
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
