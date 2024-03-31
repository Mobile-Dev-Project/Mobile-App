import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import Carousel from "react-native-snap-carousel";

const { width } = Dimensions.get("window");

const data = [
  { id: 1, image: require("../assets/imgs/levi-spirit-bedroom.jpg") },
  { id: 2, image: require("../assets/imgs/LeviSpirit.jpg") },
  { id: 3, image: require("../assets/imgs/wroom.jpeg") },
  { id: 4, image: require("../assets/imgs/view.jpg") },
    // Add more images as needed
];

const ImageCarousel = () => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Image source={item.image} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  item: {
    width: width,
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default ImageCarousel;
