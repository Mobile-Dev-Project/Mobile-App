import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import RoomCard from "../components/RoomCard";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SelectRoomScreen = ({ route }) => {
  const navigation = useNavigation();
  const {
    singlePrice,
    doublePrice,
    suitePrice,
    singleRooms,
    doubleRooms,
    suiteRooms,
  } = route.params;

  const handleBooking = () => {
    navigation.navigate("BookingScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.arrowContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <RoomCard
          imageSource={require("../assets/imgs/Luxury-room.jpg")}
          roomType="Luxury Room"
          refundable={true}
          breakfastIncluded={true}
          freeWifi={true}
          price={suitePrice}
          availability={suiteRooms}
        />
        <RoomCard
          imageSource={require("../assets/imgs/double.png")}
          roomType="Double Room"
          refundable={true}
          breakfastIncluded={true}
          freeWifi={true}
          price={doublePrice}
          availability={doubleRooms}
        />
        <RoomCard
          imageSource={require("../assets/imgs/Superior-Single-Room.jpg")}
          roomType="Single Room"
          refundable={true}
          breakfastIncluded={false}
          freeWifi={true}
          price={singlePrice}
          availability={singleRooms}
        />
        <TouchableOpacity style={styles.bookingBtn} onPress={handleBooking}>
          <Text style={styles.bookingBtnText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  scrollView: {
    justifyContent: "center",
    alignItems: "center",
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
  bookingBtn: {
    backgroundColor: "#fde047",
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    width: "90%",
  },
  bookingBtnText: {
    color: "#171717",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});

export default SelectRoomScreen;
