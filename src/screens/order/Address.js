import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import {
  BackHandler,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const Address = ({ route }) => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleBackPress = () => {
      backUserBag();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  const backUserBag = () => {
    navigation.navigate("Order", { screen: "UserBag" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowHorizontalHeader}>
        <TouchableOpacity onPress={backUserBag}>
          <Image
            source={require("../../../assets/images/back_view.png")}
            style={styles.imageButton}
          />
        </TouchableOpacity>
        <Text style={styles.titleOrder}>Tus direcciones</Text>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.centeredContainer}>
          <Image
            source={require("../../../assets/images/mapa.png")}
            style={styles.centeredImage}
          />
          <Text style={styles.centeresTitle}>
            Aun no tienes direcciones guardadas
          </Text>
        </View>

        <ScrollView style={styles.limitScrollView}></ScrollView>

        <View style={styles.positionRight}>
          <TouchableOpacity style={styles.roundedButtonIcon}>
            <Image
              source={require("../../../assets/images/add_address.png")}
              style={styles.iconPlus}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.roundedButtonBottom}>
            <Text style={styles.textColorBtn}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    top: 60,
    flex: 1,
    backgroundColor: "#fff",
  },
  rowHorizontalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    marginVertical: 8,
  },
  imageButton: {
    width: 24,
    height: 24,
  },
  titleOrder: {
    fontSize: 20,
    fontWeight: "bold",
  },

  /**Caso de que no tiene data */
  centeredContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  centeresTitle: {
    top: 20,
    fontWeight: "600",
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredImage: {
    width: 200,
    height: 200,
  },

  /*Body principal**/
  bodyContainer: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 8,
  },
  limitScrollView: {
    maxHeight: "100%",
  },
  positionRight: {
    bottom: 0,
    end: 0,
    position: "absolute",
    alignItems: "flex-end",
  },
  roundedButtonIcon: {
    width: 46,
    height: 46,
    borderRadius: 10,
    borderWidth: 2,
    elevation: 4,
    margin: 16,
    backgroundColor: "white",
    borderColor: "black",
    padding: 2,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  iconPlus: {
    width: 32,
    height: 32,
  },

  /** Bottom Container */
  footer: {
    height: 140,
    marginHorizontal: 12,
  },
  footerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginBottom: 60,
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
