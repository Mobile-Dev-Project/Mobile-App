import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert,   KeyboardAvoidingView,
  Platform, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import DateTimePicker from '@react-native-community/datetimepicker';
import { db, auth } from '../config/firebase'; // Adjust based on your actual path
import { addDoc, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const BookingScreen = () => {
    const [currentUser, setCurrentUser] = useState(null);
    // Define state variables for the form fields
    const [name, setName] = useState('');
    const [guests, setGuests] = useState('');
    const [roomType, setRoomType] = useState('');
    const [specialRequests, setSpecialRequests] = useState('');
    const [contact, setContact] = useState('');
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

    const handleBooking = async () => {
        // Check if the user is logged in
        if (!currentUser) {
            Alert.alert('Error', 'You must be logged in to make a booking.');
            return;
        }
        const totalPrice = calculatePrice();
        // Attempt to add a new booking to Firestore
        try {
            await addDoc(collection(db, 'bookings'), {
                userId: currentUser.uid,
                name,
                checkInDate: checkInDate.toISOString().split('T')[0],
                checkOutDate: checkOutDate.toISOString().split('T')[0],
                guests: parseInt(guests, 10),
                roomType,
                specialRequests,
                contact,
                totalPrice,
            });
            Alert.alert('Success', 'Booking successful.');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Booking failed.');
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
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#fff"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Number of Guests"
                placeholderTextColor="#fff"
                keyboardType="number-pad"
                value={guests}
                onChangeText={setGuests}
            />
            <TextInput
                style={styles.input}
                placeholder="Room Type (e.g., Single, Double)"
                placeholderTextColor="#fff"
                value={roomType}
                onChangeText={setRoomType}
            />
            <TextInput
                style={styles.input}
                placeholder="Special Requests"
                placeholderTextColor="#fff"
                value={specialRequests}
                onChangeText={setSpecialRequests}
            />
            <TextInput
                style={styles.input}
                placeholder="Contact Email or Phone"
                placeholderTextColor="#fff"
                value={contact}
                onChangeText={setContact}
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
            <CustomButton title="Select Check-in Date" onPress={() => setCheckInPickerShow(true)} />
            <CustomButton title="Select Check-out Date" onPress={() => setCheckOutPickerShow(true)} />
            <CustomButton title="Book Now" onPress={handleBooking} />
        </View>
      </KeyboardAwareScrollView>
    );
};

// Custom button component for styling
const CustomButton = ({ title, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#6b2bff",
    },
    input: {
        width: '100%',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        padding: 15,
        fontSize: 16,
        color: "#fff",
        marginTop: 30,
    },
    button: {
        backgroundColor: "orange",
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default BookingScreen;
