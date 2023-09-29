import {
  ScrollView,
  View,
  Image,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { registerStyle } from "../../styles/loginComponent/registerViewStyle";
import { useState } from "react";
import { LoginServices } from "../../data/services/loginServices";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const inputsAreValid = isValidInput(name, lastname, email, password);

    if (!inputsAreValid) {
      Alert.alert(
        "Error",
        "Por favor, complete todos los campos correctamente."
      );
      return;
    }

    setLoading(true);
    try {
      const response = await LoginServices.register(
        name,
        lastname,
        email,
        password
      );
      if (response.success) {
        Alert.alert("Exitoso", response.data.message);
        setName("");
        setLastname("");
        setEmail("");
        setPassword("");

        navigation.navigate("Login");
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const isValidInput = (name, lastname, email, password) => {
    return (
      name.trim().length > 0 &&
      lastname.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length > 0
    );
  };
  return (
    <ScrollView contentContainerStyle={registerStyle.container}>
      <ImageBackground
        source={require("../../../assets/images/backgroundLogin.png")}
        style={registerStyle.backgroundImage}
      >
        <View style={registerStyle.containerBody}>
          <View style={registerStyle.card}>
            <Image
              source={require("../../../assets/images/icon_login.png")}
              style={registerStyle.cardImage}
            />
            <Text style={registerStyle.cardTitle}>Registrate en Pa'Comer</Text>
            <TextInput
              style={registerStyle.inputText}
              placeholder="Nombres"
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={registerStyle.inputText}
              placeholder="Apellidos"
              onChangeText={(text) => setLastname(text)}
            />
            <TextInput
              style={registerStyle.inputText}
              placeholder="Correo"
              inputText="email"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={registerStyle.inputText}
              placeholder="Contraseña"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
            <TextInput
              style={registerStyle.inputText}
              placeholder="Confirmar contraseña"
              secureTextEntry
            />
            <TouchableOpacity style={registerStyle.roundedButton}>
              <Text style={registerStyle.buttonText} onPress={handleRegister}>
                Registrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <Spinner
        visible={loading}
        textContent={"Cargando..."}
        textStyle={{ color: "#FFF" }}
      />
    </ScrollView>
  );
};

export default Register;
