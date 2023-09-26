import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

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

const Header = ({ headerText, headerIcon }) => {
  const currentDate = new Date();
  const dayOfWeek = getDayOfWeekSpanish(currentDate);

  return (
    <View style={styles.horizontalView}>
      <Text style={styles.titleText}>{headerText + dayOfWeek}</Text>
      <FontAwesome name={headerIcon} style={styles.iconHeader} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  horizontalView: {
    flexDirection: "row",
  },
  titleText: {
    flex: 1,
    start: 4,
    fontSize: 22,
    fontWeight: "700",
  },
  iconHeader: {
    fontSize: 24,
    color: "orange",
    marginEnd: 4,
  },
});
