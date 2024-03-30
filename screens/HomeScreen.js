import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { Ionicons } from "@expo/vector-icons";
import Places from "../components/Places";
import RecommendCard from "../components/RecommendCard";
import HotelCard from "../components/HotelCard";
import Button from "../components/Button";


const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await signOut(auth);
  };
  

  return (
    <SafeAreaView style={styles.container}>
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
      <Places />
      <RecommendCard
        imageSources={[require("../assets/imgs/centaa.jpg")]}
        heading="Centa Village"
        subheading="North Oulu"
        reviewCount="3 reviews"
      />
      <HotelCard />
      <Button
        title="Find Best Hotels"
        onPress={() => navigation.navigate("FindHotelsScreen")}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12372A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: "#12372A",
    borderBottomWidth: 1,
    borderBottomColor: "#12372A",
  },
  iconContainer: {
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    color: "white",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: "#12372A",
    color: "#000",
    borderWidth: 1,
    borderColor: "white",
    margin: 8,
  },

});

export default HomeScreen;
