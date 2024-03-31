import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RecommendCard = ({ imageSources, heading, subheading, reviewCount }) => {
  return (
    <View style={styles.content}>
      <Text style={styles.recommendHeading}>Recommend Places</Text>
      <View style={styles.card}>
        <ScrollView horizontal>
          {imageSources.map((imageSource, index) => (
            <Image key={index} source={imageSource} style={styles.image} />
          ))}
          <View style={styles.content}>
            <Text style={styles.subHeading}>{heading}</Text>
            <Text style={styles.subheading}>{subheading}</Text>
            <View style={styles.reviewContainer}>
              <Ionicons name="star" size={16} color="gold" />
              <Ionicons name="star" size={16} color="gold" />
              <Ionicons name="star" size={16} color="gold" />
              <Text style={styles.reviewText}>{reviewCount}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10,
  },
  recommendHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  card: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 3,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subheading: {
    color: "#A0A0A0",
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewText: {
    marginLeft: 5,
    color: "#A0A0A0",
  },
});

export default RecommendCard;
