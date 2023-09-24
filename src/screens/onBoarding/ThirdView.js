import {
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { thirdOnBoardingStyles } from "../../styles/thirdViewStyle";
import { useNavigation } from "@react-navigation/native";
import { useBackButtonHandler } from "../../util/LifeCycle";

const ThirdView = () => {
  const navigation = useNavigation();

  useBackButtonHandler();

  const showLogin = () => {
    navigation.navigate("LoginComponent", { screen: "Login" });
  };
  return (
    <ImageBackground style={thirdOnBoardingStyles.container}>
      <View style={thirdOnBoardingStyles.body}>
        <Image
          source={require("../../../assets/images/eating_3.png")}
          style={thirdOnBoardingStyles.image}
        />
        <Text style={thirdOnBoardingStyles.textBottomFromImage}>
          Salvemos la tierra, es el unico planeta que tiene cerveza
        </Text>
      </View>
      <View style={thirdOnBoardingStyles.bottom}>
        <View style={thirdOnBoardingStyles.separatorContainer}>
          <View style={thirdOnBoardingStyles.separatorBottom} />
        </View>
        <View style={thirdOnBoardingStyles.horizontalCotainerBottom}>
          <TouchableOpacity
            style={thirdOnBoardingStyles.buttonEndStyle}
            onPress={showLogin}
          >
            <Text style={thirdOnBoardingStyles.buttonText}>Finalizar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ThirdView;
