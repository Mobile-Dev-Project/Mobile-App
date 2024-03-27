import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Button } from "react-native";

const { width, height } = Dimensions.get("window");

const HotelCard = () => {
    const handlePress = () => {
        console.log("Button Pressed");
    };
  const images = [
    require("../assets/imgs/courtyard.jpg"),
    require("../assets/imgs/radissa.jpg"),
    require("../assets/imgs/skiin.jpg"),
    require("../assets/imgs/clarion.jpg"),
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Nearby Hotels</Text>
      <View>
        <FlatList
          data={images}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={{ width: width * 0.4, height: height / 3, margin: 5 }}
              >
                <Image
                  source={item} // Use the current item as the image source
                  style={{
                    width: "100%",
                    height: "80%",
                    borderRadius: 10,
                    borderColor: "white",
                  }}
                  resizeMode="cover"
                />
                <Text style={styles.countryText}>Tempere {index + 1}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()} // Provide a unique key for each item
        />
      </View>
        <Button style={styles.btn} onPress={handlePress} title="Find Best Hotels" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginTop: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
    marginBottom: 5,
  },
  subheading: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
  countryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
    textAlign: "center",
  },
  reviews: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3498db", // Change color as per your design
    marginTop: 10,
    textAlign: "center",
    textDecorationLine: "underline",
  },
   
});

export default HotelCard;
