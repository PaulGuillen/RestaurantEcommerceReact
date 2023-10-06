import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";

const CreateAddress = () => {
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

  const [isEditable, setIsEditable] = useState(false);

  const handlePress = () => {
    selectPositionMaps();
  };

  const backAddress = () => {
    navigation.navigate("Order", { screen: "Address" });
  };

  const selectPositionMaps = () => {
    navigation.navigate("Order", { screen: "Maps" });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowHorizontalHeader}>
        <TouchableOpacity onPress={backAddress}>
          <Image
            source={require("../../../assets/images/back_view.png")}
            style={styles.imageButton}
          />
        </TouchableOpacity>
        <Text style={styles.titleOrder}>Nueva direccion</Text>
      </View>

      <View style={styles.bodyContainer}>
        <TextInput placeholder="Direccion" />
        <TouchableOpacity onPress={handlePress}>
          <TextInput placeholder="Escribe algo" editable={isEditable} />
        </TouchableOpacity>
        <TextInput placeholder="Referencia" />
      </View>

      <View style={styles.footer}>
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.roundedButtonBottom}>
            <Text style={styles.textColorBtn}>Crear direccion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateAddress;

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

  /*Body principal**/
  bodyContainer: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 8,
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
