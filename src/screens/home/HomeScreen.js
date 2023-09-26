import { SafeAreaView, StyleSheet } from "react-native";
import SearchFilter from "../../components/SearchFilter";
import Header from "../../components/Header";
import CardViewPromotion from "../../components/CardViewPromotion";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header headerText={"Feliz "} headerIcon={"shopping-bag"} />

      <SearchFilter icon="search" placeholder={"Buscando..."} />

      <CardViewPromotion />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 60,
  },
  categoryFilterView: {
    marginTop: 20,
  },
  recipeCardView: {
    flex: 1,
    marginTop: 20,
  },
  subTitleTextView: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default HomeScreen;
