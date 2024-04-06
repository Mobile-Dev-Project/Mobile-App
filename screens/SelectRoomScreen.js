import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import RoomCard from "../components/RoomCard";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SelectRoomScreen = () => {
  const navigation = useNavigation();

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
          price={200}
          availability={5}
          handleBooking={handleBooking} // Pass the handleBooking function to the RoomCard
        />
        <RoomCard
          imageSource={require("../assets/imgs/double.png")}
          roomType="Double Room"
          refundable={true}
          breakfastIncluded={true}
          freeWifi={true}
          price={150}
          availability={3}
          handleBooking={handleBooking} // Pass the handleBooking function to the RoomCard
        />
        <RoomCard
          imageSource={require("../assets/imgs/QuadRoom.png")}
          roomType="Suite"
          refundable={true}
          breakfastIncluded={false}
          freeWifi={true}
          price={150}
          availability={2}
          handleBooking={handleBooking} // Pass the handleBooking function to the RoomCard
        />
        <RoomCard
          imageSource={require("../assets/imgs/Superior-Single-Room.jpg")}
          roomType="Single Room"
          refundable={true}
          breakfastIncluded={false}
          freeWifi={true}
          price={100}
          availability={2}
          handleBooking={handleBooking} // Pass the handleBooking function to the RoomCard
        />
        {/* Add more RoomCard components as needed */}
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
});

export default SelectRoomScreen;
