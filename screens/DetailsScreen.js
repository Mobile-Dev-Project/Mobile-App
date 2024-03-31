import React from 'react';
import { Button, View, Text,StyleSheet } from 'react-native';
import ImageCarousel from '../components/ImageCarousel';

const DetailsScreen = () => (
  <View style={styles.container}>
    <ImageCarousel />
  </View>
);

export default DetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

