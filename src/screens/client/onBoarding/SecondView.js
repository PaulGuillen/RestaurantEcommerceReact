import {
  ImageBackground,
  View,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { secondOnBoardingStyles } from "../../../styles/secondViewStyle.js";
import { useNavigation } from "@react-navigation/native";

const SecondView = () => {
  const navigation = useNavigation();

  const showFirstView = () => {
    navigation.navigate("FirstView");
  };

  const showThirdView = () => {
    navigation.navigate("ThirdView");
  };

  return (
    <ImageBackground style={secondOnBoardingStyles.container}>
      <View style={secondOnBoardingStyles.body}>
        <Image
          source={require("../../../../assets//images/eating_2.png")}
          style={secondOnBoardingStyles.image}
        />
        <Text style={secondOnBoardingStyles.textBottomFromImage}>
          Come y bebe que la vida es breve, no dejes para mañana lo que puede
          comer hoy
        </Text>
      </View>

      <View style={secondOnBoardingStyles.bottom}>
        <View style={secondOnBoardingStyles.separatorContainer}>
          <View style={secondOnBoardingStyles.separatorBottom} />
        </View>
        <View style={secondOnBoardingStyles.horizontalCotainerBottom}>
          <TouchableOpacity
            style={secondOnBoardingStyles.buttonStartStyle}
            onPress={showFirstView}
          >
            <Text style={secondOnBoardingStyles.buttonText}>Previo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={secondOnBoardingStyles.buttonEndStyle}
            onPress={showThirdView}
          >
            <Text style={secondOnBoardingStyles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SecondView;
