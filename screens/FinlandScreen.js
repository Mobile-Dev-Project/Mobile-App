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
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
const HomeScreen = React.lazy(() => import("./HomeScreen"));

// Define the destinations array outside of your FinlandScreen component
const destinations = [
  {
    name: "Suomenlinna Sea Fortress",
    location: "Helsinki, Finland",
    rating: "4.7",
    reviews: "1123",
    image: require("../assets/Suomenlinna.jpg"), // Correct path to your asset
    description:"Explore the beautiful city of Helsinki and visit the historic Suomenlinna Maritime Fortress on a guided tour. Learn about the history of the city and the fortress with a professional guide.",
  },
  {
    name: "Santa Claus Village",
    location: "Rovaniemi, Finland",
    rating: "4.8",
    reviews: "987",
    image: require("../assets/GlassResortAir3-2048x1210.jpg"), // Correct path to your asset
    url: "https://santaclausvillage.info/accommodation/glass-resort/",
    description:"Experience the magic of Christmas at Santa Claus Village in Rovaniemi. Meet Santa, ride a husky sled, and enjoy a traditional Finnish Christmas dinner.",
  },
  {
    name: "Hotel Kämp",
    location: "Helsinki, Finland",
    rating: "4.7",
    reviews: "892",
    image: require("../assets/Hotel_Kamp_Exterior_001.jpg"),
    description:"Stay at the luxurious Hotel Kämp in Helsinki and enjoy world-class service and amenities. Explore the city's attractions and dine at the hotel's Michelin-starred restaurant.",
  },
  {
    name: "Arctic TreeHouse Hotel",
    location: "Rovaniemi, Finland",
    rating: "4.6",
    reviews: "763",
    image: require("../assets/Arctic-TreeHouse-hotel-rovaniemi-lapland-1920x1152.jpg"),
    description:"Experience the magic of the Arctic Circle at the Arctic TreeHouse Hotel in Rovaniemi. Stay in a luxury treehouse and enjoy stunning views of the Northern Lights.",
  },
  {
    name: "Levi Spirit",
    location: "Levi, Finland",
    rating: "4.8",
    reviews: "428",
    image: require("../assets/Hotelli_Vanajanlinna_Hameenlinna_Vanajanlinna_Group_ravintola_kokous_juhlat_haat_tapahtumat-1.jpg"),
    description:"Stay at the Levi Spirit luxury hotel in Levi and enjoy a range of outdoor activities, including skiing, snowboarding, and snowmobiling. Relax in the hotel's spa and dine at the on-site restaurant.",
  },
  {
    name: "Lapland Hotels SnowVillage",
    location: "Kittilä, Finland",
    rating: "4.5",
    reviews: "317",
    image: require("../assets/snowvillage_picture1-200x150,q=75.jpg"),
    description:"Experience the magic of Lapland at the SnowVillage in Kittilä. Stay in a luxury ice hotel, explore the snow and ice sculptures, and enjoy a range of winter activities.",
  },
];

// Define the DestinationItem component
const DestinationItem = ({ destination }) => {
  const navigation = useNavigation(); // Use useNavigation hook here

  const handleImagePress = () => {
    console.log("Pressed");
    navigation.navigate("DetailsScreen", {
      destination: destination,
    });
  };

  // Function to render star icons based on rating
  const renderRatingStars = () => {
    const rating = parseFloat(destination.rating); // Parse rating to float
    const stars = [];
    for (let i = 0; i < 5; i++) {
      // Iterate 5 times for 5 stars
      if (i < Math.floor(rating)) {
        // Render filled star if index is less than rating
        stars.push(<FontAwesome name="star" size={10} color="#f5d507" key={i} />);
      } else {
        // Render empty star if index is greater than or equal to rating
        stars.push(<FontAwesome name="star-o" size={10} color="#f5d507" key={i} />);
      }
    }
    return stars;
  };

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={handleImagePress}>
      <Image source={destination.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{destination.name}</Text>
        <Text style={styles.location}>{destination.location}</Text>
        <View style={styles.ratingContainer}>
          {/* Render star icons for rating */}
          <Text style={styles.rating}>{destination.rating}</Text>
          {renderRatingStars()}
          {destination.reviews && (
            <Text style={styles.reviews}>({destination.reviews} Reviews)</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Main FinlandScreen component
const FinlandScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.videoContainer}>
        <View style={styles.BtnContain}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.video}>
          <Video
            source={require("../assets/finland.mp4")}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={styles.backgroundVideo}
          />
        </View>
      </View>
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
  videoContainer: {
    display: "flex",
    flexDirection: "row",
  },
  BtnContain: {
    flex: -1,
  },
  video: {
    flex: 3,
  },
  backgroundVideo: {
    marginTop: 50,
    marginLeft: -40,
    width: "110%",
    height: 200,
    borderRadius: 10,
    zIndex: -1,
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
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 10,
    borderColor: "#f5d507",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20, // Adjusted for rounded images
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
