import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import Carousel from "pinar";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";

const data = [
  { id: 1, image: require("../assets/Suomenlinna.jpg") },
  { id: 2, image: require("../assets/imgs/LeviSpirit.jpg") },
  { id: 3, image: require("../assets/imgs/wroom.jpeg") },
  { id: 4, image: require("../assets/imgs/levi-spirit-bedroom.jpg") },
];
const height = Dimensions.get("window").height;
const marginTop = Constants.statusBarHeight;
const ImageSlider = ({ navigation }) => {
  const desiredHeightPercentage = 0.4; // 40% of device height
  const carouselContainerHeight = height * desiredHeightPercentage - marginTop;

  return (
    <View
      style={[styles.carouselContainer, { height: carouselContainerHeight }]}
    >
      {/* Carousel */}
      <Carousel
        style={styles.carousel}
        showsControls={false}
        dotStyle={styles.dotStyle}
        activeDotStyle={[styles.dotStyle, { backgroundColor: "white" }]}
      >
        {data.map((img) => (
          <Image key={img.id} style={styles.image} source={img.image} />
        ))}
      </Carousel>
    </View>
  );
};

const styles = StyleSheet.create({
  dotStyle: {
    width: 30,
    height: 3,
    backgroundColor: "silver",
    marginHorizontal: 3,
    borderRadius: 3,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
  carousel: {
    height: "100%",
    width: "100%",
  },
  carouselContainer: {
    height: (height - marginTop) / 1.9,
    marginHorizontal: -10,
    marginTop: marginTop - 30,
    position: "relative", // Ensure the arrow container is positioned relative to this container
  },
});

export default ImageSlider;
