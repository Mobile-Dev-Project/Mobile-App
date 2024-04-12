import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Video } from "expo-av";
import "react-native-gesture-handler";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const HomeScreen = React.lazy(() => import("./HomeScreen"));

// Main FinlandScreen component
const TampereScreen = ({ navigation }) => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchAndCacheHotels = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "destinations"));
        console.log("Documents fetched:", querySnapshot.docs.length);

        const storePromises = querySnapshot.docs.map((doc) => {
          const hotelData = doc.data();
          const hotelDataString = JSON.stringify(hotelData);
          return AsyncStorage.setItem(doc.id, hotelDataString); // Cache each hotel
        });

        await Promise.all(storePromises);
        console.log("All hotels stored in AsyncStorage.");

        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        const retrievedHotels = result.map(([key, value]) => JSON.parse(value));

        setHotels(retrievedHotels);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchAndCacheHotels();
  }, []);

  const handleImagePress = (hotel) => {
    console.log("Pressed");
    navigation.navigate("DetailsScreen", {
      hotel: hotel,
    });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.videoContainer}>
        <View style={styles.BtnContain}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color="#171717" />
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
        <Text style={styles.title}>Tampere</Text>
        <Text style={styles.description}>
          Embrace the dynamic city life. Immerse yourself in museums, theatres,
          and a thriving music scene, all surrounded by stunning lakes and
          national parks perfect for outdoor adventures.{" "}
        </Text>
        <Text style={styles.subtitle}>Popular Destinations</Text>
        {/* Map through destinations array to render DestinationItem components */}
        {hotels
          .filter((hotel) => hotel.location == "Tampere")
          .map((hotel, index) => (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={() => handleImagePress(hotel)}
            >
              <Image source={{ uri: hotel.image }} style={styles.image} />
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{hotel.name}</Text>
                <Text style={styles.location}>{hotel.location}</Text>
                <View style={styles.ratingContainer}>
                  {/* Render star icons for rating */}
                  <FontAwesome name="star" size={16} color="#f5d507" />
                  <Text style={styles.rating}>{hotel.rating}</Text>
                  {hotel.reviews && (
                    <Text style={styles.reviews}>
                      ({hotel.reviews} Reviews)
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
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
    marginLeft: 4,
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
    backgroundColor: "#fcfcfc",
    borderRadius: 150,
  },
  location: {
    color: "white",
  },
});

export default TampereScreen;
