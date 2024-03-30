import { StyleSheet } from "react-native";
import { Provider as PaperProvider } from 'react-native-paper';
import React from "react";
import AppNavigation from "./AppNavigation";

export default function App() {
  return (
    <PaperProvider>
      <AppNavigation />
    </PaperProvider>
  );
}
