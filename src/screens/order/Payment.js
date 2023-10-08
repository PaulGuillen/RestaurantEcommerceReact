import { useNavigation } from "@react-navigation/native";
import { useEffect} from "react";
import {
  BackHandler,
  StyleSheet,
  View,
} from "react-native";

const Payment = () => {
  const navigation = useNavigation();
 
  useEffect(() => {
    const handleBackPress = () => {
      backAddress();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  const backAddress = () => {
    navigation.navigate("Order", { screen: "Address" });
  };


  return (
    <View style={styles.container}>
    
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
