import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Places = () => {
  const navigation = useNavigation();

  const handelHelsinkiPress = () => {
    // Navigate to the desired screen when the image is pressed
    navigation.navigate("HelsinkiScreen");
  };

  const handelTamperePress = () => {
    // Navigate to the desired screen when the image is pressed
    navigation.navigate("TampereScreen");
  };

  const handelTurkuPress = () => {
    // Navigate to the desired screen when the image is pressed
    navigation.navigate("TurkuScreen");
  };

  return (
    <View style={styles.content}>
      <Text style={styles.heading}>Places</Text>
      <View style={styles.countryContainer}>
        <TouchableOpacity
          onPress={handelHelsinkiPress}
          style={[styles.countryBox, { marginRight: 10 }]}
        >
          <Image
            source={require("../assets/imgs/centaa.jpg")}
            style={styles.countryImage}
          />
          <Text style={styles.countryText}>Helsinki</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handelTamperePress}
          style={[styles.countryBox, { marginRight: 10 }]}
        >
          <Image
            source={require("../assets/imgs/helsinki.jpg")}
            style={styles.countryImage}
          />
          <Text style={styles.countryText}>Tampere</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handelTurkuPress}
          style={[styles.countryBox, { marginRight: 10 }]}
        >
          <Image
            source={require("../assets/imgs/Oulu.jpg")}
            style={styles.countryImage}
          />
          <Text style={styles.countryText}>Turku</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handelTurkuPress}
          style={[styles.countryBox, { marginRight: 10 }]}
        >
          <Image
            source={require("../assets/imgs/Tempere.jpg")}
            style={styles.countryImage}
          />
          <Text style={styles.countryText}>Rovaniemi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Places;
const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20, // Only one definition for marginBottom
    color: "#f5d507", // Set text color to white
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
