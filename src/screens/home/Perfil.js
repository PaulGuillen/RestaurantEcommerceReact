import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { PerfilServices } from "../../data/services/perfilServices";
import Spinner from "react-native-loading-spinner-overlay";

const Perfil = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync("userUid")
      .then((uid) => {
        if (uid) {
          fetchData(uid);
        } else {
          console.log("El UID no está disponible en SecureStore");
        }
      })
      .catch((error) => {
        console.error("Error al obtener el UID desde SecureStore:", error);
      });
  }, []);

  const fetchData = async (uniqueID) => {
    setLoading(true);
    try {
      const response = await PerfilServices.mainUser(uniqueID);
      if (response.success) {
        const { name, lastname, email } = response.data;
        setData({ name, lastname, email });
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/eating.png")}
        style={styles.profileImage}
      />
      <Text style={styles.fullName}>
        {data.name} {data.lastname}
      </Text>
      <Text style={styles.email}>{data.email}</Text>
      <View style={styles.containerBottom}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Salir sesión</Text>
        </TouchableOpacity>
      </View>
      <Spinner
        visible={loading}
        textContent={"Cargando..."}
        textStyle={{ color: "#FFF" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 160,
    height: 180,
    borderRadius: 60,
    marginBottom: 20,
  },
  fullName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
  containerBottom: {
    position: "absolute",
    bottom: 40,
  },
});

export default Perfil;
