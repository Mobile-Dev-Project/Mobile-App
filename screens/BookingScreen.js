import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { db, auth } from "../config/firebase"; // Adjust based on your actual path
import { addDoc, collection } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';

const BookingScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // Define state variables for the form fields
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("");
  const [roomType, setRoomType] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [contact, setContact] = useState("");
  // State for managing date picker visibility and selected dates
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [isCheckInPickerShow, setCheckInPickerShow] = useState(false);
  const [isCheckOutPickerShow, setCheckOutPickerShow] = useState(false);

  // useEffect hook for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleBooking = async () => {
    if (!currentUser) {
      Alert.alert("Error", "You must be logged in to make a booking.");
      return;
    }
  
    const emailRegex = /\S+@\S+\.\S+/; // Simple regex for email validation
    if (!name.trim() || !guests.trim() || !roomType || !contact.trim() || !emailRegex.test(contact)) {
      Alert.alert("Validation Error", "Please fill in all fields correctly. Ensure the contact is a valid email.");
      return;
    }
  
    const numberOfGuests = parseInt(guests, 10);
    if (isNaN(numberOfGuests) || numberOfGuests <= 0) {
      Alert.alert("Validation Error", "Number of guests must be a positive number.");
      return;
    }
  
    const totalPrice = calculatePrice();
    try {
      await addDoc(collection(db, "bookings"), {
        userId: currentUser.uid,
        name,
        checkInDate: checkInDate.toISOString().split("T")[0],
        checkOutDate: checkOutDate.toISOString().split("T")[0],
        guests: numberOfGuests,
        roomType,
        specialRequests,
        contact,
        totalPrice,
      });
      Alert.alert("Success", "Booking successful.");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Booking failed.");
    }
  };
  
  // Calculate the total price based on the number of nights
  const calculatePrice = () => {
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * 90; // Assuming 90 euros per night
  };

  // Handlers for date change
  const onDateChange = (event, selectedDate, isCheckIn) => {
    if (isCheckIn) {
      setCheckInDate(selectedDate || checkInDate);
      setCheckInPickerShow(false); // Hide the picker
    } else {
      setCheckOutDate(selectedDate || checkOutDate);
      setCheckOutPickerShow(false); // Hide the picker
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.BtnContain}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color="#171717" />
          </TouchableOpacity>
        </View>
        <Text style={styles.heading}>Book a Room</Text>

        {/* Text that implies this is a name text input */}
        <Text style={styles.inputref}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Mati Kif"
          placeholderTextColor="#575757"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.inputref}>Number of Guests</Text>
        <TextInput
          style={styles.input}
          placeholder="eg. 2"
          placeholderTextColor="#575757"
          keyboardType="number-pad"
          value={guests}
          onChangeText={setGuests}
        />

<Text style={styles.inputref}>Room Type</Text>
<Picker
  selectedValue={roomType}
  style={styles.picker}
  dropdownIconColor={"#fff"}
  onValueChange={(itemValue, itemIndex) => setRoomType(itemValue)}
>
  <Picker.Item label="Select Room Type" value="" />
  <Picker.Item label="Single" value="Single" />
  <Picker.Item label="Double" value="Double" />
  <Picker.Item label="Suite" value="Suite" />
</Picker>


        <Text style={styles.inputref}>Contact</Text>
        <TextInput
          style={styles.input}
          placeholder="mati@gmail.com, 123-456-7890"
          placeholderTextColor="#575757"
          value={contact}
          onChangeText={setContact}
        />

        <Text style={styles.inputref}>Special Requests</Text>
        <TextInput
          style={styles.input}
          placeholder="Special Requests"
          placeholderTextColor="#575757"
          value={specialRequests}
          onChangeText={setSpecialRequests}
        />
        {/* Date pickers for check-in and check-out dates */}

        {isCheckInPickerShow && (
          <DateTimePicker
            value={checkInDate}
            mode="date"
            display="default"
            onChange={(event, date) => onDateChange(event, date, true)}
          />
        )}
        {isCheckOutPickerShow && (
          <DateTimePicker
            value={checkOutDate}
            mode="date"
            display="default"
            onChange={(event, date) => onDateChange(event, date, false)}
          />
        )}
        {/* Custom buttons for selecting dates and making a booking */}
        <View style={styles.customContainer}>
          <TouchableOpacity
            style={styles.buttondate}
            onPress={() => setCheckInPickerShow(true)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="calendar" size={24} color="#171717" />
              <Text style={styles.buttonText}>Check-in Date</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttondate}
            onPress={() => setCheckOutPickerShow(true)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="calendar" size={24} color="#171717" />
              <Text style={styles.buttonText}>Check-out Date</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleBooking}>
          <Text style={styles.buttonTextBook}>Book Now</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#171717",
  },
  heading: {
    fontSize: 38,
    fontWeight: "bold",
    marginVertical: 8,
    color: "white",
    alignSelf: "center",
    marginBottom: 20,
  },
  inputref: {
    color: "#fcfcfc",
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
    color: "#fff",
  },
  buttondate: {
    backgroundColor: "#fcfcfc",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#171717",
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#fde047",
    padding: 10,
    borderRadius: 25,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonTextBook: {
    color: "#171717",
    fontSize: 24,
    fontWeight: "bold",
  },
  backBtnContainer: {
    alignSelf: "flex-start", // Aligns the button to the left
    marginTop: 10,
  },
  backBtn: {
    marginTop: 30,
    padding: 10,
    width: 45,
    marginLeft: 4,
    backgroundColor: "#fcfcfc",
    borderRadius: 150,
  },
  iconContainer: {
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  customContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#fff',
    backgroundColor: '#333',
    marginBottom: 10,
    borderRadius: 5,
  },
  
});

export default BookingScreen;
