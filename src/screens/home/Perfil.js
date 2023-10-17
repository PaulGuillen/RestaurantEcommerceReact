import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView,
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
        const { name, lastname, email, phone } = response.data;
        setData({ name, lastname, email, phone });
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
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View syle={styles.containerImage}>
          <Image
            source={require("../../../assets/images/eating.png")}
            style={styles.profileImage}
          />
        </View>

        <Text style={styles.fullName}>
          {data.name} {data.lastname}
        </Text>
        <Text style={styles.email}>{data.email}</Text>
        <View style={styles.phoneContainer}>
          <Text style={styles.phone}>{data.phone}</Text>
          <TouchableOpacity style={styles.button}>
            <Image
              source={require("../../../assets/images/update_phone.png")}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      </View>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },

  profileImage: {
    width: 180,
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
    marginBottom: 10,
  },

   /** Phone container */
   phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  phone: {
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  image: {
    width: 28,
    height: 28,
  },

  /**Bottom button logOut */
  containerBottom: {
    alignItems: "center", 
    bottom: 20,
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

});

export default Perfil;
