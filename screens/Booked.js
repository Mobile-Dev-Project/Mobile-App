import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import "react-native-gesture-handler";
import {
  AntDesign,
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const Booked = ({ navigation }) => {
  const [rooms, setrooms] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    const fetchAndCacherooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        const storePromises = querySnapshot.docs.map((doc) => {
          const hotelData = doc.data();
          const hotelDataString = JSON.stringify(hotelData);
          return AsyncStorage.setItem(doc.id, hotelDataString);
        });

        await Promise.all(storePromises);

        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        const retrievedrooms = result.map(([key, value]) => {
          const room = JSON.parse(value);
          // console.log("Retrieved room from AsyncStorage:", room);
          return room;
        });

        setrooms(retrievedrooms);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchAndCacherooms();
    return () => unsubscribe();
  }, []);

  const getImageForRoomType = (roomType) => {
    switch (roomType) {
      case "Single":
        return require("../assets/imgs/Superior-Single-Room.jpg");
      case "Double":
        return require("../assets/imgs/double.png");
      case "Suite":
        return require("../assets/imgs/QuadRoom.png");
      default:
        return require("../assets/imgs/view.jpg"); // Default image if none matches
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.BtnContain}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#171717" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          {currentUser?.displayName}'s Reservations
        </Text>
        {/* Map through booked rooms to render room information */}
        {rooms
          .filter(
            (hotel) =>
              hotel.contact === currentUser.email &&
              hotel.createdAt &&
              new Date().getTime() - new Date(hotel.createdAt).getTime() <
                86400000
          )
          .map((hotel, index) => (
            <View key={index} style={styles.itemContainer}>
              <Image
                source={getImageForRoomType(hotel.roomType)}
                style={styles.image}
              />
              <View style={styles.header}>
                <Text style={styles.hotelName}>{hotel.hotelName}</Text>
                <Text style={[styles.remain]}>
                  {Math.ceil(
                    (86400000 -
                      (new Date().getTime() -
                        new Date(hotel.createdAt).getTime())) /
                      1000 /
                      60 /
                      60
                  )}
                  hrs
                </Text>
              </View>

              {/* Render other room details */}

              <View style={styles.discCont}>
                <AntDesign name="calendar" size={20} color="#f5d507" />
                <Text style={styles.description}>
                  {hotel.checkInDate} / {hotel.checkOutDate}
                </Text>
              </View>
              <View style={styles.discCont}>
                <Fontisto name="persons" size={20} color="#f5d507" />
                <Text style={styles.description}> {hotel.guests}</Text>
              </View>
              <View style={styles.discCont}>
                <FontAwesome name="bed" size={20} color="#f5d507" />
                <Text style={styles.description}>{hotel.roomType}</Text>
              </View>
              <View style={styles.discCont}>
                <MaterialCommunityIcons
                  name="room-service"
                  size={20}
                  color="#f5d507"
                />
                <Text style={styles.description}>{hotel.specialRequests}</Text>
              </View>
              <View style={styles.discCont}>
                <FontAwesome name="money" size={20} color="#f5d507" />
                <Text style={styles.description}>${hotel.totalPrice}</Text>
              </View>
            </View>
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
  content: {
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#f5d507",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
    marginBottom: 8,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  remain: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 8,
  },
  description: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
    marginLeft: 8,
  },
  itemContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#333333",
    marginBottom: 16,
  },
  discCont: {
    flexDirection: "row",
    backgroundColor: "#171717",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  image: {
    width: 360,
    height: 200,
    marginTop: -10,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 28,
  },
  backBtn: {
    marginTop: 50,
    marginBottom: 10,
    padding: 10,
    width: 45,
    marginLeft: 10,
    backgroundColor: "#fcfcfc",
    borderRadius: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  location: {
    color: "white",
  },
});

export default Booked;
