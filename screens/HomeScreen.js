import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const HomeScreen = () => {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Home screen of the app!</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoutBtn: {
    backgroundColor: "#f00",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
});

export default HomeScreen;
