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
  const [rooms, setRooms] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const fetchAndCacheRooms = async () => {
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
          const retrievedRooms = result.map(([key, value]) =>
            JSON.parse(value)
          );
          setRooms(retrievedRooms);
        } catch (error) {
          console.error("An error occurred:", error);
          setError("Failed to fetch bookings. Please try again later.");
        }
      };

      fetchAndCacheRooms();
    }
  }, [currentUser]);

  const getImageForRoomType = (roomType) => {
    switch (roomType) {
      case "Single":
        return require("../assets/imgs/Superior-Single-Room.jpg");
      case "Double":
        return require("../assets/imgs/double.png");
      case "Suite":
        return require("../assets/imgs/QuadRoom.png");
      default:
        return require("../assets/imgs/view.jpg");
    }
  };

  const currentTime = new Date().getTime();
  const expiredBookings = rooms.filter(
    (hotel) =>
      currentTime - new Date(hotel.createdAt).getTime() >= 86400000 &&
      currentUser.email === hotel.contact
  );
  const activeBookings = rooms.filter(
    (hotel) =>
      currentTime - new Date(hotel.createdAt).getTime() < 86400000 &&
      currentUser.email === hotel.contact
  );

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
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <>
            <Text style={styles.title}>
              {currentUser?.displayName}'s Active Reservations
            </Text>
            {activeBookings.length > 0 ? (
              activeBookings.map((hotel, index) => (
                <BookingItem
                  key={index}
                  hotel={hotel}
                  getImageForRoomType={getImageForRoomType}
                />
              ))
            ) : (
              <Text style={styles.noReservations}>No active reservations.</Text>
            )}

            <Text style={styles.title}>
              {currentUser?.displayName}'s Expired Reservations
            </Text>
            {expiredBookings.length > 0 ? (
              expiredBookings.map((hotel, index) => (
                <BookingItem
                  key={index}
                  hotel={hotel}
                  getImageForRoomType={getImageForRoomType}
                />
              ))
            ) : (
              <Text style={styles.noReservations}>
                No expired reservations.
              </Text>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const BookingItem = ({ hotel, getImageForRoomType }) => (
  <View style={styles.itemContainer}>
    <Image source={getImageForRoomType(hotel.roomType)} style={styles.image} />
    <View style={styles.header}>
      <Text style={styles.hotelName}>{hotel.hotelName}</Text>
      <Text style={[styles.remain]}>
        {Math.ceil(
          (86400000 -
            (new Date().getTime() - new Date(hotel.createdAt).getTime())) /
            1000 /
            60 /
            60
        )}
        hrs
      </Text>
    </View>

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
      <MaterialCommunityIcons name="room-service" size={20} color="#f5d507" />
      <Text style={styles.description}>{hotel.specialRequests}</Text>
    </View>
    <View style={styles.discCont}>
      <FontAwesome name="money" size={20} color="#f5d507" />
      <Text style={styles.description}>${hotel.totalPrice}</Text>
    </View>
  </View>
);

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
  error: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  noReservations: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 16,
  },
});

export default Booked;
