import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const handleLogout = async () => {
    await signOut(auth);
  };

  const city = [
    {
      img: "https://live.staticflickr.com/3781/20157867196_f3667afee8_b.jpg",
      name: "oulu",
    },
    {
      img: "helsinki.jpg",
      name: "helsinki",
    },
    {
      img: "ruka.jpg",
      name: "oulu",
    },
    {
      img: "Tempere.jpg",
      name: "tempere",
    },
  ];

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogout} style={styles.iconContainer}>
          <Ionicons name="person-outline" size={24} color="white" />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#A0A0A0"
        />
      </View>
      <View style={styles.content}>
        <Text style={[styles.heading, { color: "black" }]}>Countries</Text>
        <View style={styles.countryContainer}>
          {city.map((item, index) => (
            <View style={[styles.countryBox, { marginRight: 10 }]} key={index}>
              <Image source={{ uri: item.img }} style={styles.countryImage} />
              <Text style={styles.countryText}>{item.name}</Text>
            </View>
          ))}
        </View>
        <View>
          <Text style={styles.heading}>Nearby Hotels</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12372A",
    paddingTop: 40, // Add space from the top
  },
  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: "#6b2bff",
    borderBottomWidth: 1,
    borderBottomColor: "#12372A",
  },
  iconContainer: {
    marginRight: 10,
    flexDirection: "row", // Add flexDirection to align icon and text horizontally
    alignItems: "center", // Align items vertically
  },
  logoutText: {
    color: "white", // Set text color to white
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: "#12372A",
    color: "#000",
    borderWidth: 1, // Add border width
    borderColor: "white", // Set border color
    margin: 8, // Add margin
  },
  content: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20, // Only one definition for marginBottom
    color: "white", // Set text color to white
  },
  countryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    margin: "auto",
  },
  countryBox: {
    width: "30%", // Adjusted width to accommodate spacing
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20, // Add space between country boxes
  },
  countryImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Use "cover" to maintain aspect ratio and fill the container
    borderRadius: 10, // Set border radius for rounded corners
    overflow: "hidden", // Clip the image to the border radius
  },
  countryText: {
    fontSize: 10,
    marginTop: 2,
    color: "black", // Set text color to black
  },
});

export default HomeScreen;
