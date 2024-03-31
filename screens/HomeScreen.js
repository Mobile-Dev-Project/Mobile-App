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
import { FontAwesome5 } from "@expo/vector-icons";
import Places from "../components/Places";
import RecommendCard from "../components/RecommendCard";
import HotelCard from "../components/HotelCard";
const FinlandScreen = React.lazy(() => import('./FinlandScreen'));
const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#A0A0A0"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("FindHotelsScreen")}
          style={styles.btnsearch}
        >
          <Ionicons name="search" size={24} color="#123" />
        </TouchableOpacity>
      </View>
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
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleLogout} style={styles.btnIcon}>
            <Ionicons name="person" size={24} color="white" />
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
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
  btnsearch: {
    backgroundColor: "#fff",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  fotter: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    borderTopColor: "#fff",
    borderTopWidth: 1,
  },
  btnIcon: {
    alignItems: "center",
    backgroundColor: "#12372A",
    borderRadius: 20,
  },
});

export default HomeScreen;
