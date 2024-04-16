import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const HotelCard = () => {
  const navigation = useNavigation();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchAndCacheHotels = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "destinations"));

        const storePromises = querySnapshot.docs.map((doc) => {
          const hotelData = doc.data();
          const hotelDataString = JSON.stringify(hotelData);
          return AsyncStorage.setItem(doc.id, hotelDataString); // Cache each hotel
        });

        await Promise.all(storePromises);

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

  const hotelsTopRated = hotels.filter((hotel) => hotel.rating >= 4.8);
  const sortedHotels = hotelsTopRated
    .slice()
    .sort((a, b) => b.rating - a.rating);

  const handleImagePress = (hotel) => {
    console.log("Pressed", hotels);
    navigation.navigate("DetailsScreen", {
      hotel: hotel,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Rated</Text>
      <View>
        <FlatList
          data={sortedHotels}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={{ width: width * 0.4, height: height / 3, margin: 15 }}
                onPress={() => handleImagePress(item)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: "100%",
                    height: "70%",
                    borderRadius: 10,
                  }}
                />
                {/* Display the name, rateing and locations of the hotel */}
                <View style={styles.disc}>
                  <Text style={styles.countryText}>{item.name}</Text>
                  <View style={styles.innerdisc}>
                    <Text style={styles.subheading}>
                      <EvilIcons name="location" size={14} color="white" />{" "}
                      {item.location}
                    </Text>
                    <Text style={styles.reviews}>
                      <AntDesign name="star" size={14} color="gold" />{" "}
                      {item.rating} ({item.reviews} reviews)
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()} // Provide a unique key for each item
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#f5d507",
    marginTop: 10,
    marginBottom: 10,
  },
  subheading: {
    fontSize: 12,
    color: "#fcfcfc",
    textAlign: "center",
  },
  disc: {
    backgroundColor: "#171717",
    borderRadius: 10,
  },
  innerdisc: {
    backgroundColor: "#171717",
    borderRadius: 10,
  },
  countryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fcfcfc",
    marginTop: 5,
    textAlign: "center",
  },
  reviews: {
    fontSize: 12,
    color: "#fcfcfc",
    textAlign: "center",
  },
});

export default HotelCard;
