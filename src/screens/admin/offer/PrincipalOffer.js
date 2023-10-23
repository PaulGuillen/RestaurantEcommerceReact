import { useState, useEffect } from 'react';
import {
  Image, View, TextInput, Button, TouchableOpacity, Text, Alert, ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AdminServices } from '../../../data/services/adminServices';
import { HomeServices } from '../../../data/services/homeServices';
import { Picker } from '@react-native-picker/picker';
import { commonOfferStyles } from '../../../styles/admin/offer/commonOfferStyle';
import { arrayChunk, colorsGroup, convertImageToBase64, getSpanishMonth } from '../../../util/Util';
import Spinner from "react-native-loading-spinner-overlay";

const PrincipalOffer = () => {
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
  const currentDate = new Date();
  const currentMonth = getSpanishMonth(currentDate);

  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');
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

    const rangeDay = `${startDay} - ${endDay} ${currentMonth}`

    const mainOfferData = {
      id: "01",
      image: ulrImage,
      title: formData.title,
      color: selectedColor,
      price: parseFloat(formData.price),
      description: formData.description,
      percentOffer: formData.percentOffer,
      type: selectedCategory,
      rangeDay: rangeDay
    };

    setLoading(true);
    try {
      const response = await mainOffer(mainOfferData);
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

  const mainOffer = async (mainOfferData) => {
    const response = await AdminServices.mainOffer(mainOfferData);
    return response;
  };

  const uploadImage = async (dataImage) => {
    const response = await AdminServices.uploadImage(dataImage);
    return response;
  };

  return (
    <ScrollView>
      <View style={commonOfferStyles.container}>
        <View style={commonOfferStyles.imageContainer}>
          {imageUri && <Image source={{ uri: imageUri }} style={commonOfferStyles.image} />}
          <Button title="Subir imagen" onPress={handleImageUpload} />
        </View>
        <TextInput
          placeholder="Nombre producto"
          value={formData.title}
          onChangeText={(text) => handleInputChange('title', text)}
          style={commonOfferStyles.textTitle}
        />
        <View style={commonOfferStyles.horizontal}>
          <TextInput
            placeholder="Precio"
            style={commonOfferStyles.textPrice}
            value={formData.price}
            onChangeText={(text) => handleInputChange('price', text)}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Descuento %"
            value={formData.percentOffer}
            onChangeText={(text) => handleInputChange('percentOffer', text)}
            style={commonOfferStyles.textOfferDiscount}
          />
        </View>
        <TextInput
          placeholder="Descripción"
          multiline={true}
          value={formData.description}
          onChangeText={(text) => handleInputChange('description', text)}
          style={commonOfferStyles.descriptionText}
        />
        <Text style={commonOfferStyles.textRangoOferta}>
          Rango oferta
        </Text>
        <View style={commonOfferStyles.horizontal}>
          <TextInput
            style={commonOfferStyles.textStarDate}
            placeholder="Dia Inicio"
            maxLength={2}
            keyboardType="numeric"
            onChangeText={(text) => setStartDay(text)}
          />
          <TextInput
            style={commonOfferStyles.textEndDate}
            placeholder="Dia Fin"
            maxLength={2}
            keyboardType="numeric"
            onChangeText={(text) => setEndDay(text)}
          />
          <Text style={commonOfferStyles.textMonth}>{currentMonth}</Text>
        </View>
        <View style={commonOfferStyles.pickerContainer}>
          <Picker
            selectedValue={formData.type}
            onValueChange={(itemValue, itemIndex) => {
              handleInputChange('type', itemValue);
              const selectedText = data.find((category) => category.id === itemValue)?.type;
              setSelectedCategory(selectedText || '');
            }}
          >
            {data.map((category) => (
              <Picker.Item
                key={category.id}
                label={category.category}
                value={category.id}
              />
            ))}
          </Picker>
        </View>
        <Text style={commonOfferStyles.textColorBackground}>
          Colores de fondo
        </Text>
        <View style={commonOfferStyles.horizontalColorsContainer}>
          {arrayChunk(colorsGroup, colorsPerRow).map((colorGroup, rowIndex) => (
            <View key={`row-${rowIndex}`} style={commonOfferStyles.horizontalColorsRow}>
              {colorGroup.map((color, index) => (
                <TouchableOpacity
                  key={`color-${rowIndex}-${index}`}
                  style={[commonOfferStyles.circularFirst,
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
          style={commonOfferStyles.submitButton}
        >
          <Text style={commonOfferStyles.submitText}>Enviar formulario</Text>
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


export default PrincipalOffer;
