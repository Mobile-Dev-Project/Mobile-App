import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Places from "../components/Places";
import RecommendCard from "../components/RecommendCard";
import HotelCard from "../components/HotelCard";

const FinlandScreen = React.lazy(() => import("./FinlandScreen"));

const HomeScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.inputref}>
          Welcome{" "}
          <Text style={{ color: "#fde047", fontStyle: "italic" }}>
            {currentUser?.displayName}
          </Text>
        </Text>
        <Places />
        <RecommendCard
          imageSources={[require("../assets/imgs/centaa.jpg")]}
          heading="Centa Village"
          subheading="North Oulu"
          reviewCount="3 reviews"
        />
        <HotelCard />
        <View style={styles.fotter}>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("FinlandScreen")}
              style={styles.btnIcon}
            >
              <FontAwesome5 name="hotel" size={24} color="white" />
              <Text style={{ color: "white" }}>Hotels</Text>
            </TouchableOpacity>
          </View>
          {/* Add Booked.js here */}
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Booked")}
              style={styles.btnIcon}
            >
              <AntDesign name="key" size={24} color="white" />
              <Text style={{ color: "white" }}>Booked</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleLogout} style={styles.btnIcon}>
              <Ionicons name="person" size={24} color="white" />
              <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: "#171717",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 14,
    paddingBottom: 4,
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
    borderWidth: 1,
    borderColor: "#fcfcfc",
    margin: 4,
  },
  btnsearch: {
    paddingHorizontal: 10,
  },
  inputref: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    margin: 12,
  },
  fotter: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
    margin: 12,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  btnIcon: {
    alignItems: "center",
    borderRadius: 20,
  },
});

export default HomeScreen;
