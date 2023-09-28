import { ScrollView, StyleSheet, View, Keyboard } from "react-native";
import SearchFilter from "../../components/SearchFilter";
import Header from "../../components/Header";
import CardViewPromotion from "../../components/CardViewPromotion";
import CategoriesFilter from "../../components/CategoriesFilter";
import ProductCard from "../../components/ProductCard";
import { useState, useEffect } from "react";

const HomeScreen = () => {
  const [filterText, setFilterText] = useState("");
  const [keyboardActive, setKeyboardActive] = useState(false);

  const handleFilterChange = (text) => {
    setFilterText(text);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardActive(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardActive(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header headerText={"Feliz "} headerIcon={"shopping-bag"} />

      <SearchFilter
        icon="search"
        placeholder={"Buscando..."}
        onFilterChange={handleFilterChange}
      />

      <CardViewPromotion />

      <View style={styles.categoryFilterView}>
        <CategoriesFilter />
      </View>

      <View
        style={[styles.productView, { paddingBottom: keyboardActive ? 60 : 0 }]}
      >
        <ProductCard filterText={filterText} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: 10,
    marginTop: 60,
  },
  categoryFilterView: {},
  productView: {
    flex: 1,
  },
});

export default HomeScreen;