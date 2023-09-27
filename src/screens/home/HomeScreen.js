import { SafeAreaView, StyleSheet, View } from "react-native";
import SearchFilter from "../../components/SearchFilter";
import Header from "../../components/Header";
import CardViewPromotion from "../../components/CardViewPromotion";
import CategoriesFilter from "../../components/CategoriesFilter";
import ProductCard from "../../components/ProductCard";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header headerText={"Feliz "} headerIcon={"shopping-bag"} />

      <SearchFilter icon="search" placeholder={"Buscando..."} />

      <CardViewPromotion />

      <View style={styles.categoryFilterView}>
        <CategoriesFilter />
      </View>

      <View style={styles.productView}>
        <ProductCard />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 60,
  },
  recipeCardView: {
    flex: 1,
    marginTop: 20,
  },
  categoryFilterView: {},

  productView: {
    flex: 1,
  },
});

export default HomeScreen;
