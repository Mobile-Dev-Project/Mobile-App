import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import RecommendCard from './RecommendCard'
import HotelCard from './HotelCard';

const Places = () => {
  return (
    <View style={styles.content}>
      <Text style={styles.heading}>Places</Text>
      <View style={styles.countryContainer}>
        <View style={[styles.countryBox, { marginRight: 10 }]}>
          <Image
            source={require("../assets/imgs/centaa.jpg")}
            style={styles.countryImage}
          />
          <Text style={styles.countryText}>Centa Village</Text>
        </View>
        <View style={[styles.countryBox, { marginRight: 10 }]}>
          <Image
            source={require("../assets/imgs/helsinki.jpg")}
            style={styles.countryImage}
          />
          <Text style={styles.countryText}>Helsinki</Text>
        </View>
        <View style={[styles.countryBox, { marginRight: 10 }]}>
          <Image
            source={require("../assets/imgs/Oulu.jpg")}
            style={styles.countryImage}
          />
          <Text style={styles.countryText}>Oulu</Text>
        </View>
        <View style={styles.countryBox}>
          <Image
            source={require("../assets/imgs/Tempere.jpg")}
            style={styles.countryImage}
          />
          <Text style={styles.countryText}>Tempere</Text>
        </View>
      </View>
      <RecommendCard
        imageSources={[require("../assets/imgs/centaa.jpg")]}
        heading="Centa Village"
        subheading="North Oulu"
        reviewCount="3 reviews"
      />
     <HotelCard />
    </View>
  );
}
export default Places
const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20, // Only one definition for marginBottom
    color: "white", // Set text color to white
  },
  countryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    margin: "auto",
  },
  countryBox: {
    width: "30%", // Adjusted width to accommodate spacing
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20, // Add space between country boxes
  },
  countryImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Use "cover" to maintain aspect ratio and fill the container
    borderRadius: 10, // Set border radius for rounded corners
    overflow: "hidden", // Clip the image to the border radius
  },
  countryText: {
    fontSize: 10,
    marginTop: 2,
    color: "white", // Set text color to black
  },
});