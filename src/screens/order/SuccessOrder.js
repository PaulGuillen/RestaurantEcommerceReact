import { useNavigation } from "@react-navigation/native";
import {
  BackHandler,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect } from "react";

const SuccessOrder = () => {
  const navigation = useNavigation();

  const goToHomeView = () => {
    navigation.navigate("Home", { screen: "HomeScreen" });
  };

  useEffect(() => {
    const handleBackPress = () => {
      goToHomeView();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/images/check_success.png")}
            style={styles.centeredImage}
          />
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.successMessage}>
            La orden se registro con exito, gracias por confiar en nostros, en
            unos momentos lo llamaremos.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={goToHomeView}
            style={styles.roundedButtonBottom}
          >
            <Text style={styles.textColorBtn}>Finalizar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SuccessOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    paddingTop: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredImage: {
    width: 200,
    height: 200,
  },
  messageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    paddingTop: 20,
  },
  successMessage: {
    fontSize: 20,

    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },

  footer: {
    height: 140,
    marginHorizontal: 12,
  },
  footerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  roundedButtonBottom: {
    backgroundColor: "white",
    borderWidth: 2,
    elevation: 4,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    borderColor: "black",
    width: "80%",
  },
  textColorBtn: {
    color: "black",
    fontWeight: "500",
    fontSize: 14,
  },
});
