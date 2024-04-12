import React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ImageSlider from "../components/ImageSlider";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const DetailsScreen = ({ navigation, route }) => {
  const handleBookNow = () => {
    navigation.navigate("SelectRoomScreen"); // Navigate to BookingScreen when Book Now is pressed
  };

  const { hotel } = route.params;
  const { name, location, rating, description, reviews } = hotel;

  // Now you can use these properties in your JSX to display the details

  return (
    <ScrollView style={styles.container}>
      {/* Arrow icon */}
      <View style={styles.arrowContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#fcfcfc" />
        </TouchableOpacity>
      </View>
      <ImageSlider />
      <Text style={styles.heading}>{name}</Text>
      {/* add a rating and reviews here */}
      <View style={styles.locaRate}>
        <View style={styles.locacont}>
          <FontAwesome5 name="map-marker-alt" size={16} color="#fcfcfc" />
          <Text style={styles.location}>{location}</Text>
        </View>
        <View style={styles.ratecont}>
          <AntDesign name="star" size={16} color="#fcfcfc" />
          <Text style={styles.rate}>{rating}</Text>
          <Text style={styles.review}> ({reviews} reviews)</Text>
        </View>
      </View>
      {/* guestes, bed and room details */}
      <View style={styles.details}>
        <View style={styles.detailcont}>
          <FontAwesome5 name="spa" size={18} color="#fcfcfc" />
          <Text style={styles.location}>Spa</Text>
        </View>
        <View style={styles.detailcont}>
          <Ionicons name="bed" size={18} color="#fcfcfc" />
          <Text style={styles.location}>Queen Bed</Text>
        </View>
        <View style={styles.detailcont}>
          <Ionicons name="wifi" size={18} color="#fcfcfc" />
          <Text style={styles.location}>Free Wifi</Text>
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.detailcont}>
          <Entypo name="air" size={18} color="#fcfcfc" />
          <Text style={styles.location}>Air Conditioner</Text>
        </View>
        <View style={styles.detailcont}>
          <FontAwesome5 name="paw" size={18} color="#fcfcfc" />
          <Text style={styles.location}>Pets Allowed</Text>
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.detailcont}>
          <FontAwesome5 name="concierge-bell" size={18} color="#fcfcfc" />
          <Text style={styles.location}>24hr Service</Text>
        </View>
        <View style={styles.detailcont}>
          <FontAwesome5 name="swimming-pool" size={18} color="#fcfcfc" />
          <Text style={styles.location}>Pool</Text>
        </View>
        <View style={styles.detailcont}>
          <MaterialCommunityIcons
            name="weight-lifter"
            size={18}
            color="#fcfcfc"
          />
          <Text style={styles.location}>Gym</Text>
        </View>
      </View>
      <View style={styles.overview}>
        <Text style={styles.heading}>Overview</Text>
        <Text style={styles.location}>{description}</Text>
      </View>
      {/* price per night  and person details with new style */}
      <View style={styles.BookingInfo}>
        <Text style={styles.bookinfo}>1 night, 1 adult</Text>
        <Text style={styles.price}>$150</Text>
        <Text style={styles.location}>includes taxes and charges</Text>
      </View>
      <View style={styles.BookContain}>
        <TouchableOpacity style={styles.bookBtn} onPress={handleBookNow}>
          <Text style={styles.txtBtn}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 8,
    color: "white",
    margin: 12,
    color: "#f5d507",
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
    backgroundColor: "#171717",
    borderRadius: 150,
  },
  ratecont: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 12,
    color: "white",
  },
  rate: {
    color: "white",
    marginLeft: 5,
  },
  review: {
    color: "white",
    marginLeft: 5,
  },
  locaRate: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginBottom: 10,
  },
  locacont: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 12,
  },
  location: {
    color: "white",
    marginLeft: 5,
  },
  details: {
    flexDirection: "row",
    marginHorizontal: 12,
  },
  detailcont: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 12,
    borderWidth: 1,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: "#f5d507",
  },
  overview: {
    marginHorizontal: 12,
    marginBottom: 20,
  },
  BookingInfo: {
    marginHorizontal: 12,
  },
  bookinfo: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  price: {
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
    color: "#fde047",
  },
  BookContain: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  bookBtn: {
    padding: 12,
    backgroundColor: "#fde047",
    borderRadius: 30,
    width: 320,
  },
  txtBtn: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DetailsScreen;
