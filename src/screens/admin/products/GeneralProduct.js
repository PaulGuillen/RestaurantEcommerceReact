import { useState, useEffect, useCallback } from 'react';
import {
  Image, View, TextInput, Button, TouchableOpacity, Text, Alert, ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AdminServices } from '../../../data/services/adminServices';
import { HomeServices } from '../../../data/services/homeServices';
import { Picker } from '@react-native-picker/picker';
import { generalProductStyle } from '../../../styles/admin/offer/generalProductStyle';
import { arrayChunk, colorsGroup, convertImageToBase64 } from '../../../util/Util';
import Spinner from "react-native-loading-spinner-overlay";
import { v4 as uuidv4 } from 'uuid';
import { useFocusEffect } from '@react-navigation/native';

const GeneralProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [ulrImage, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    percentOffer: '',
    rangeDay: '',
    type: '',
  });

  const [selectedColor, setSelectedColor] = useState('');
  const colorsPerRow = 4;
  const [selectedCategory, setSelectedCategory] = useState('');
  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  useEffect(() => {
    fetchData();
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Se requieren permisos de la galería de fotos.');
      }
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

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

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const fileName = result.assets[0].uri.split('/').pop();
      setImageUri(result.assets[0].uri);
      const base64Image = await convertImageToBase64(result.assets[0].uri);

      const dataImage = {
        imageInBase64: base64Image,
        fileName: fileName,
      };

      setLoading(true);
      try {
        const response = await uploadImage(dataImage);
        if (response.success) {
          Alert.alert("Promoción creada", response.data.message);
          const imageUrl = response.data.url;
          setImageUrl(imageUrl);
        } else {
          Alert.alert("Error", response.error);
        }
      } catch (error) {
        Alert.alert("Error", "Ocurrió un error en la solicitud.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    const productOffer = {
      image: ulrImage,
      title: formData.title,
      color: selectedColor,
      price: formData.price,
      description: formData.description,
      type: selectedCategory,
    };

    setLoading(true);
    try {
      const response = await createProduct(productOffer);
      if (response.success) {
        Alert.alert("Actualizado", response.data.message);
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error en la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productOffer) => {
    const response = await AdminServices.createProduct(productOffer);
    return response;
  };

  const uploadImage = async (dataImage) => {
    const response = await AdminServices.uploadImage(dataImage);
    return response;
  };

  return (
    <ScrollView>
      <View style={generalProductStyle.container}>
        <View style={generalProductStyle.imageContainer}>
          {imageUri && <Image source={{ uri: imageUri }} style={generalProductStyle.image} />}
          <Button title="Subir imagen" onPress={handleImageUpload} />
        </View>
        <TextInput
          placeholder="Nombre producto"
          value={formData.title}
          onChangeText={(text) => handleInputChange('title', text)}
          style={generalProductStyle.textTitle}
        />
        <View style={generalProductStyle.horizontal}>
          <TextInput
            placeholder="Precio"
            style={generalProductStyle.textPrice}
            value={formData.price}
            onChangeText={(text) => handleInputChange('price', text)}
            keyboardType="numeric"
          />
        </View>
        <TextInput
          placeholder="Descripción"
          multiline={true}
          value={formData.description}
          onChangeText={(text) => handleInputChange('description', text)}
          style={generalProductStyle.descriptionText}
        />

        <Text style={generalProductStyle.textColorBackground}>
          Categorias
        </Text>

        <View style={generalProductStyle.pickerContainer}>
          <Picker
            selectedValue={formData.type}
            onValueChange={(itemValue, itemIndex) => {
              handleInputChange('type', itemValue);
              const selectedText = data.find((category) => category.categoryID === itemValue)?.type;
              setSelectedCategory(selectedText || '');
            }}
          >
            {data.map((category) => (
              <Picker.Item
                key={uuidv4()}
                label={category.category}
                value={category.categoryID}
              />
            ))}
          </Picker>
        </View>
        <Text style={generalProductStyle.textColorBackground}>
          Colores de fondo
        </Text>
        <View style={generalProductStyle.horizontalColorsContainer}>
          {arrayChunk(colorsGroup, colorsPerRow).map((colorGroup, rowIndex) => (
            <View key={rowIndex} style={generalProductStyle.horizontalColorsRow}>
              {colorGroup.map((color, index) => (
                <TouchableOpacity
                  key={uuidv4()}
                  style={[generalProductStyle.circularFirst,
                  {
                    backgroundColor: color,
                    borderWidth: selectedColor === color ? 1 : 0,
                  },
                  ]}
                  onPress={() => handleColorSelection(color)}
                />
              ))}
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={generalProductStyle.submitButton}
        >
          <Text style={generalProductStyle.submitText}>Enviar formulario</Text>
        </TouchableOpacity>
      </View>
      <Spinner
        visible={loading}
        textContent={"Cargando..."}
        textStyle={{ color: "#FFF" }}
      />
    </ScrollView>
  );

};


export default GeneralProduct;
