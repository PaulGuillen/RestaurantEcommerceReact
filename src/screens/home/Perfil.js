import { Text, Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const Perfil = () => {
  const navigation = useNavigation();

  const userProfile = {
    fullName: "John Doe",
    email: "johndoe@example.com",
    profileImage: require("../../../assets/images/eating.png"),
  };

  // Obtén el UID guardado en SecureStore
  SecureStore.getItemAsync("userUid")
    .then((uid) => {
      if (uid) {
        console.log("UUID:", uid);
      } else {
        console.log("El UID no esta disponible en SecureStore");
      }
    })
    .catch((error) => {
      console.error("Error al obtener el UID desde SecureStore:", error);
    });

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image source={userProfile.profileImage} style={styles.profileImage} />
      <Text style={styles.fullName}>{userProfile.fullName}</Text>
      <Text style={styles.email}>{userProfile.email}</Text>
      <View style={styles.containerBottom}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Salir sesión</Text>
        </TouchableOpacity>
      </View>
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
