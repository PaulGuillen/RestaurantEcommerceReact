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
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import { AddressServices } from "../../data/services/addressServices";
import * as SecureStore from "expo-secure-store";
import Spinner from "react-native-loading-spinner-overlay";

const CreateAddress = ({ route }) => {
  const navigation = useNavigation();

  const { selectedCoordinates, selectedMarkerAddress } = route.params || {};
  const [isEditable, setIsEditable] = useState(false);
  const [coordinates, setCoordinates] = useState(selectedCoordinates || "");

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(selectedMarkerAddress || "");
  const [reference, setReference] = useState("");
  const [av, setAv] = useState("");

  useEffect(() => {
    if (selectedCoordinates !== undefined && selectedCoordinates !== null) {
      setCoordinates(selectedCoordinates);
    } else {
      console.log("No se han proporcionado coordenadas seleccionadas");
    }
  }, [selectedCoordinates]);

  useEffect(() => {
    if (selectedMarkerAddress !== undefined && selectedMarkerAddress !== null) {
      setAddress(selectedMarkerAddress);
    } else {
      console.log("No se han proporcionado direcciones seleccionadas");
    }
  }, [selectedMarkerAddress]);

  useEffect(() => {
    const handleBackPress = () => {
      Alert.alert(
        "Confirmar",
        "¿Deseas salir de esta pantalla sin guardar los cambios?",
        [
          {
            text: "Cancelar",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "Salir",
            onPress: () => backAddress(),
          },
        ],
        { cancelable: false }
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const handlePress = () => {
    selectPositionMaps();
  };

  const backAddress = () => {
    navigation.navigate("Order", { screen: "Address" });
  };

  const selectPositionMaps = () => {
    navigation.navigate("Order", { screen: "Maps" });
  };

  const isValidInput = (av, address, ref) => {
    return (
      av.trim().length > 0 && address.trim().length > 0 && ref.trim().length > 0
    );
  };

  const fetchDataAndUID = async () => {
    try {
      const uid = await SecureStore.getItemAsync("userUid");
      if (uid) {
        createAddress(uid);
      } else {
        console.log("El UID no está disponible en SecureStore");
      }
    } catch (error) {
      console.error("Error al obtener el UID desde SecureStore:", error);
    }
  };

  const createAddress = async (uniqueUID) => {
    const inputsAreValid = isValidInput(av, address, reference);

    if (!inputsAreValid) {
      Alert.alert(
        "Error",
        "Por favor, complete todos los campos correctamente."
      );
      return;
    }

    const newAddress = {
      district: av,
      ref: reference,
      direction: address,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    };

    const listAddress = [newAddress];

    const addressData = {
      userUID: uniqueUID,
      listAddress: listAddress,
    };

    setLoading(true);
    try {
      const response = await AddressServices.saveAddress(addressData);

      if (response.success) {
        Alert.alert("Exitoso", response.data.message);
        setAddress("");
        setAv("");
        setReference("");
        navigation.navigate("Order", { screen: "Address" });
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
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
        <Text style={styles.titleOrder}>Nueva dirección</Text>
      </View>

      <View style={styles.bodyContainer}>
        <TextInput
          style={styles.addressTextInput}
          onChangeText={(text) => setAv(text)}
          placeholder="Av, Calle, Jr, etc."
        />
        <TouchableOpacity onPress={handlePress}>
          <TextInput
            value={address}
            placeholder="Direccion"
            editable={isEditable}
            multiline={true}
            style={styles.addressTextInput}
            onChangeText={(text) => setDirection(text)}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.addressTextInput}
          onChangeText={(text) => setReference(text)}
          placeholder="Referencia"
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.roundedButtonBottom}
            onPress={fetchDataAndUID}
          >
            <Text style={styles.textColorBtn}>Crear dirección</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Spinner
        visible={loading}
        textContent={"Cargando..."}
        textStyle={{ color: "#FFF" }}
      />
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
    marginVertical: 12,
  },
  addressTextInput: {
    marginBottom: 24,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    minHeight: 80,
    justifyContent: "center",
    backgroundColor: "white",
    maxHeight: 200,
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
