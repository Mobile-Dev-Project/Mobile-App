import { StyleSheet, Text, View } from 'react-native'
const BookingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{color:'white', textAlign:'center'}}>BookingScreen</Text>
    </View>
  )
}
export default BookingScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#6b2bff",
        justifyContent:'center'
    },        

})