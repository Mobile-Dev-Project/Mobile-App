import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'

const Button = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
    color: "#000",
    borderWidth: 1,
    borderColor: "white",
    margin: 8,
    backgroundColor: "#069B77",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 40,
  },
});

export default Button;