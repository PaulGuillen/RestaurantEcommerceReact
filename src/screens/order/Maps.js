import { useEffect, useState } from "react";
import { BackHandler, Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
const Maps = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        backNewAddress();
        return true;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      // Solicitar permisos de ubicación
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permiso de ubicación denegado");
        return;
      }

      // Obtener la ubicación actual
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const backNewAddress = () => {
    navigation.navigate("Order", { screen: "CreateAddress" });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={location}>
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Ubicación"
            description="Descripción de la ubicación"
          />
        )}
      </MapView>
      <Text style={styles.text}>Maps</Text>
      <Button title="Volver" onPress={backNewAddress} />
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  text: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    zIndex: 1,
  },
});
