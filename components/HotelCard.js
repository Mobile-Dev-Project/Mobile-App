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
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const HotelCard = () => {
  const destination = [
    {
      name: "Courtyard",
      image: require("../assets/imgs/courtyard.jpg"),
      location: "Helsinki",
      rate: 4.5,
    },
    {
      name: "Radissa",
      image: require("../assets/imgs/radissa.jpg"),
      location: "Tampere",
      rate: 4.2,
    },
    {
      name: "Skiin",
      image: require("../assets/imgs/skiin.jpg"),
      location: "Turku",
      rate: 4.7,
    },
    {
      name: "Clarion",
      image: require("../assets/imgs/clarion.jpg"),
      location: "Oulu",
      rate: 4.0,
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Rated</Text>
      <View>
        <FlatList
          data={destination}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={{ width: width * 0.4, height: height / 3, margin: 5 }}
              >
                <Image
                  source={item.image} // Use the current item as the image source
                  style={{
                    width: "100%",
                    height: "80%",
                    borderRadius: 10,
                    borderColor: "white",
                  }}
                  resizeMode="cover"
                />
                {/* Display the name, rateing and locations of the hotel */}
                <View style={styles.disc}>
                  <Text style={styles.countryText}>{item.name}</Text>
                  <View style={styles.innerdisc}>
                    <Text style={styles.subheading}>
                      <EvilIcons name="location" size={14} color="white" />{" "}
                      {item.location}
                    </Text>
                    <Text style={styles.reviews}>
                      <AntDesign name="star" size={14} color="gold" />{" "}
                      {item.rate}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()} // Provide a unique key for each item
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f5d507",
    marginTop: 10,
    marginBottom: 5,
  },
  subheading: {
    fontSize: 12,
    color: "white",
  },
  disc: {
    backgroundColor: "#171717",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  innerdisc: {
    backgroundColor: "#171717",
    borderRadius: 10,
    marginTop: 10,
  },
  countryText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
    textAlign: "center",
  },
  reviews: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
  },
});

export default HotelCard;
