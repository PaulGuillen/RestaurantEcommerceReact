import {
  ScrollView,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useBackButtonHandler } from '../../util/LifeCycle.js';
import { loginStyle } from '../../styles/loginComponent/loginViewStyle.js';

const Login = () => {
  useBackButtonHandler();

  return (
    <ScrollView contentContainerStyle={loginStyle.container}>
      <ImageBackground
        source={require('../../assets/images/backgroundLogin.png')}
        style={loginStyle.backgroundImage}
      >
        <View style={loginStyle.containerBody}>
          <View style={loginStyle.card}>
            <Image
              source={require('../../assets/images/icon_login.png')}
              style={loginStyle.cardImage}
            />
            <Text style={loginStyle.cardTitle}>Bienvenido a Pa'Comer</Text>
            <Text style={loginStyle.cardSubtitle}>
              Ingrese correo y contraseña
            </Text>
            <TextInput
              style={loginStyle.inputText}
              placeholder='Correo'
              inputText='email'
            />
            <TextInput
              style={loginStyle.inputText}
              placeholder='Contraseña'
              secureTextEntry
            />
            <TouchableOpacity style={loginStyle.roundedButton}>
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
