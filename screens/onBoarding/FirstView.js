import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { onBoardingStyles } from "../../styles/firstViewStyle.js";
import { useNavigation } from "@react-navigation/native";

const FirstView = () => {
  const navigation = useNavigation();
  const showSecondView = () => {
    navigation.navigate("SecondView");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/backgroundViewPrincipal.png")}
      style={onBoardingStyles.container}
    >
      <View style={onBoardingStyles.header}>
        <View style={onBoardingStyles.rotatedContainer}>
          <Text style={onBoardingStyles.textLeft}>Restaurant</Text>
        </View>
        <View style={onBoardingStyles.separator} />
        <View style={onBoardingStyles.verticalContainer}>
          <Text style={onBoardingStyles.textRigth}>El hambre</Text>
          <Text style={onBoardingStyles.textRigth}>no </Text>
          <Text style={onBoardingStyles.textRigth}>espera</Text>
        </View>
      </View>

      <View style={onBoardingStyles.body}>
        <View style={onBoardingStyles.imageContainer}>
          <Image
            source={require("../../assets/images/eating.png")}
            style={onBoardingStyles.image}
          />
          <View style={onBoardingStyles.textBottomFromImageContainer}>
            <Text style={onBoardingStyles.textBottomFromImage}>
              Tripa vacía
            </Text>
            <Text style={onBoardingStyles.textBottomFromImage}>❤️</Text>
            <Text style={onBoardingStyles.textBottomFromImage}>
              sin alegría
            </Text>
          </View>
        </View>
      </View>

      <View style={onBoardingStyles.bottom}>
        <View style={onBoardingStyles.separatorContainer}>
          <View style={onBoardingStyles.separatorBottom} />
        </View>
        <TouchableOpacity
          style={onBoardingStyles.buttonStyle}
          onPress={showSecondView}
        >
          <Text style={onBoardingStyles.buttonText}>Siguiente..</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default FirstView;
