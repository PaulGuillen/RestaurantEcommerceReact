import {
  ScrollView,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { useBackButtonHandler } from "../../util/LifeCycle";
import { loginStyle } from "../../styles/loginComponent/loginViewStyle.js";
import { useState } from "react";
import { LoginServices } from "../../data/services/loginServices";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();

  useBackButtonHandler();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleLogin = async () => {
    const inputsAreValid = isValidInput(email, password);

    if (!inputsAreValid) {
      Alert.alert(
        "Error",
        "Por favor, complete todos los campos correctamente."
      );
      return;
    }

    setLoading(true);
    try {
      const response = await LoginServices.login(email, password);
      if (response.success) {
        navigation.navigate("HomeComponent", { screen: "HomeScreen" });
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const isValidInput = (email, password) => {
    return email.trim().length > 0 && password.trim().length > 0;
  };

  return (
    <ScrollView contentContainerStyle={loginStyle.container}>
      <ImageBackground
        source={require("../../../assets/images/backgroundLogin.png")}
        style={loginStyle.backgroundImage}
      >
        <View style={loginStyle.containerBody}>
          <View style={loginStyle.card}>
            <Image
              source={require("../../../assets/images/icon_login.png")}
              style={loginStyle.cardImage}
            />
            <Text style={loginStyle.cardTitle}>Bienvenido a Pa'Comer</Text>
            <Text style={loginStyle.cardSubtitle}>
              Ingrese correo y contraseña
            </Text>
            <TextInput
              style={loginStyle.inputText}
              placeholder="Correo"
              inputText="email"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={loginStyle.inputText}
              placeholder="Contraseña"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={loginStyle.roundedButton}
              onPress={handleLogin}
            >
              <Text style={loginStyle.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <View style={loginStyle.horizontalContainer}>
              <Text>¿Nuevo Usuario?</Text>
              <TouchableOpacity>
                <Text style={loginStyle.textRegister} onPress={handleRegister}>
                  Registrarme
                </Text>
              </TouchableOpacity>
            </View>
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

export default Login;
