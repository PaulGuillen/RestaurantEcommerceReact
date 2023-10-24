import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native'
import { generalProductStyle } from '../../../styles/admin/offer/generalProductStyle'
import Spinner from "react-native-loading-spinner-overlay";
import { AdminServices } from '../../../data/services/adminServices';
import { useState } from 'react';

const Categories = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');

  const handleSubmit = async () => {
    const categoryData = {
      category: category,
      type: category,
    };

    setLoading(true);
    try {
      const response = await createCategory(categoryData);
      if (response.success) {
        Alert.alert("Categoria creada", response.data.message);
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error en la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    const response = await AdminServices.createCategory(categoryData);
    return response;
  };

  return (
    <View style={generalProductStyle.container}>
      <TextInput
        placeholder="Categoria"
        style={generalProductStyle.textTitle}
        value={category}
        onChangeText={(text) => setCategory(text)}
      />
      <TouchableOpacity
        style={generalProductStyle.submitButton}
        onPress={handleSubmit}
      >
        <Text style={generalProductStyle.submitText}>Crear Categoria</Text>
      </TouchableOpacity>
      <Spinner
        visible={loading}
        textContent={"Cargando..."}
        textStyle={{ color: "#FFF" }}
      />
    </View>
  )
}

export default Categories

