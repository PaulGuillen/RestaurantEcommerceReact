import { useCallback, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView
} from "react-native";
import { HomeServices } from "../data/services/homeServices";
import { useFocusEffect } from "@react-navigation/native";

const CategoriesFilter = ({ onSelectCategory }) => {
  const [data, setData] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  const [localSelectedCategory, setLocalSelectedCategory] = useState(null);

  const handleCategoryPress = (categoryType) => {
    if (localSelectedCategory === categoryType) {
      setLocalSelectedCategory(null);
      onSelectCategory(null);
    } else {
      setLocalSelectedCategory(categoryType);
      onSelectCategory(categoryType);
    }
  };

  const fetchData = async () => {
    try {
      const response = await HomeServices.getCategories();
      if (response.success) {
        setData(response.data);
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cargar los datos");
    }
  };

  useEffect(() => {
    if (!hasFetchedData) {
      fetchData();
      setHasFetchedData(true);
    }
  }, [hasFetchedData]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {data.map((category) => (
          <TouchableOpacity
            key={category.categoryID}
            style={[
              styles.categoryButton,
              localSelectedCategory === category.type &&
                styles.selectedCategory,
            ]}
            onPress={() => handleCategoryPress(category.type)}
          >
            <Text style={styles.textButton}>{category.category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  selectedCategory: {
    borderRadius: 18,
    fontWeight: "900",
    borderWidth: 1,
    borderColor: "black",
  },
  textButton: {
    fontSize: 18,
  },
});

export default CategoriesFilter;
