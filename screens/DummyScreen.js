import { StyleSheet, Text, View } from 'react-native'
const DummyScreen = () => {
  return (
    <View style={styles.container}>
      <Text>DummyScreen</Text>
    </View>
  )
}
export default DummyScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
    });
