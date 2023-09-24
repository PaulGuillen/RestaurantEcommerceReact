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

const Login = () => {
  useBackButtonHandler();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const loginUrl = "http://192.168.100.128:3000/users/login";

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.status === 200 || responseData.status === 200) {
        Alert.alert("Éxito", responseData.message);
        console.log("Respuesta del servidor:", responseData);
      } else {
        Alert.alert("Error", "Credenciales de inicio de sesión incorrectas");
        console.log("Respuesta del servidor:", responseData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
                <Text style={loginStyle.textRegister}>Registrarme</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default Login;
