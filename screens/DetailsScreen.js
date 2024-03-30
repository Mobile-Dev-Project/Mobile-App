import React from 'react';
import { Button, View, Text } from 'react-native';

const DetailsScreen = ({ navigation }) => (
  <View>
    <Text>Details Screen</Text>
    <Button
      title="Go Back"
      onPress={() => navigation.goBack()}
    />
  </View>
);

export default DetailsScreen;
