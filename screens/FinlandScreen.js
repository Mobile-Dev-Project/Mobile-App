import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Video } from "expo-av";
import { Linking } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const HomeScreen = React.lazy(() => import("./HomeScreen"));
import "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

// Define the destinations array outside of your FinlandScreen component
const destinations = [
  {
    name: "Suomenlinna Sea Fortress",
    location: "Helsinki, Finland",
    rating: "4.7",

    image: require("../assets/Suomenlinna.jpg"), // Correct path to your asset
    url: "https://www.suomenlinna.fi/en/visitor/plan-your-visit/maps/",
  },
  {
    name: "Santa Claus Village",
    location: "Rovaniemi, Finland",
    rating: "4.8",

    image: require("../assets/GlassResortAir3-2048x1210.jpg"), // Correct path to your asset
    url: "https://santaclausvillage.info/accommodation/glass-resort/",
  },
  {
    name: "Hotel Kämp",
    location: "Helsinki, Finland",
    rating: "4.7",
    reviews: "892",
    image: require("../assets/Hotel_Kamp_Exterior_001.jpg"),
    url: "https://www.hotelkamp.com/?gad_source=1&gclid=Cj0KCQjw2PSvBhDjARIsAKc2cgMNAsbc6ta-984zc0Am_u295fsDr9yQpl7fY5vV95FFz9E9FyLfhpMaAlD2EALw_wcB",
  },
  {
    name: "Arctic TreeHouse Hotel",
    location: "Rovaniemi, Finland",
    rating: "4.6",
    reviews: "763",
    image: require("../assets/Arctic-TreeHouse-hotel-rovaniemi-lapland-1920x1152.jpg"),
    url: "https://arctictreehousehotel.com/",
  },
  {
    name: "Levi Spirit",
    location: "Levi, Finland",
    rating: "4.8",
    reviews: "428",
    image: require("../assets/Hotelli_Vanajanlinna_Hameenlinna_Vanajanlinna_Group_ravintola_kokous_juhlat_haat_tapahtumat-1.jpg"),
    url: "https://vanajanlinna.fi/en/levispirit-home",
  },
  {
    name: "Lapland Hotels SnowVillage",
    location: "Kittilä, Finland",
    rating: "4.5",
    reviews: "317",
    image: require("../assets/snowvillage_picture1-200x150,q=75.jpg"),
    url: "https://www.laplandhotels.com/FI/lapin-hotellit/yllas/lapland-hotels-snowvillage.html",
  },
];

// Define the DestinationItem component
const DestinationItem = ({ destination }) => (
  <TouchableOpacity
    style={styles.itemContainer}
    onPress={() => {
      const url = destination.url;
      Linking.openURL(url).catch((err) =>
        console.error("Failed opening page because: ", err.message)
      );
    }}
  >
    <Image source={destination.image} style={styles.image} />
    <View style={styles.infoContainer}>
      <Text style={styles.title}>{destination.name}</Text>
      <Text style={styles.location}>{destination.location}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{destination.rating}</Text>
        <Text style={styles.reviews}>({destination.reviews} Reviews)</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// Main FinlandScreen component
const FinlandScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
      <Video
        source={require("../assets/finland.mp4")} // Correct path to your video
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={styles.backgroundVideo}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Finland</Text>
        <Text style={styles.description}>
          Finland is known for its stunning natural landscapes, vibrant cities,
          and rich cultural heritage. Explore the beautiful lakes, enjoy the
          Northern Lights, and visit Santa Claus Village.
        </Text>
        <Text style={styles.subtitle}>Popular Destinations</Text>
        {/* Map through destinations array to render DestinationItem components */}
        {destinations.map((destination, index) => (
          <DestinationItem key={index} destination={destination} />
        ))}
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6b2bff",
  },
  backgroundVideo: {
    width: "100%",
    height: 300,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#f5d507",
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: "white",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50, // Adjusted for rounded images
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    color: "white",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviews: {
    marginLeft: 4,
    color: "white",
  },
  backBtn: {
    marginTop: 50,
    marginBottom: 10,
    padding: 10,
    width: 45,
    marginLeft: 10,
    backgroundColor: "#dbc00f",
    borderRadius: 150,
  },
  location: {
    color: "white",
  },
});

export default FinlandScreen;
