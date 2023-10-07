import { useEffect, useRef, useState } from "react";
import { BackHandler, Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const Maps = () => {
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedMarkerCoordinates, setSelectedMarkerCoordinates] =
    useState(null);
  const [updatedCoordinates, setUpdatedCoordinates] = useState(null);

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

  const handleDoublePress = (event) => {
    const newMarker = {
      coordinate: event.coordinate,
    };
    const updatedMarkers = markers.filter(
      (marker) => marker !== selectedMarker
    );

    setSelectedMarker(newMarker);
    setSelectedMarkerCoordinates(newMarker.coordinate);

    setMarkers([...updatedMarkers, newMarker]);
  };

  useEffect(() => {
    const getCurrentLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permiso de ubicación denegado");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (selectedMarker) {
      const coordinates = selectedMarker.coordinate;
      setSelectedMarkerCoordinates(coordinates);
      setUpdatedCoordinates(coordinates);
      console.log("Coordenadas actualizadas:", coordinates);
    }
  }, [selectedMarker]);

  const saveLocation = () => {
    navigation.navigate("Order", {
      screen: "CreateAddress",
      params: {
        selectedCoordinates: selectedMarkerCoordinates || null,
      },
    });

    console.log("Pasando como parametros", updatedCoordinates);
  };

  const backNewAddress = () => {
    navigation.navigate("Order", {
      screen: "CreateAddress",
      params: {
        selectedCoordinates: selectedMarkerCoordinates || null,
      },
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={
          location
            ? {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            : null
        }
        onDoublePress={(e) => handleDoublePress(e.nativeEvent)}
      >
        {selectedMarker && (
          <Marker
            coordinate={selectedMarker.coordinate}
            title="Marcador seleccionado"
          />
        )}

        {location && !selectedMarker && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Posición inicial"
          />
        )}
      </MapView>
      <Text style={styles.text}>Maps</Text>
      <Button title="Guardar" onPress={saveLocation} />
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
