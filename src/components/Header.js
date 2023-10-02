import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

function getDayOfWeekSpanish(date) {
  const daysOfWeek = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];

  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}

const Header = ({ headerText }) => {
  const currentDate = new Date();
  const dayOfWeek = getDayOfWeekSpanish(currentDate);

  const navigation = useNavigation();

  const showUserBag = () => {
    navigation.navigate("Order", { screen: "UserBag" });
  };

  return (
    <View style={styles.horizontalView}>
      <Text style={styles.titleText}>{headerText + dayOfWeek}</Text>
      <TouchableOpacity style={styles.button} onPress={showUserBag}>
        <Image
          source={require("../../assets/images/bag_order.png")}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  horizontalView: {
    marginTop: 10,
    flexDirection: "row",
  },
  titleText: {
    flex: 1,
    start: 4,
    fontSize: 22,
    paddingVertical: 6,
    fontWeight: "700",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
    marginEnd: 4,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 5,
  },
  image: {
    width: 24,
    height: 24,
  },
});
