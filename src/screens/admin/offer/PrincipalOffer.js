import { useState, useEffect } from 'react';
import {
  StyleSheet, ScrollView, Image, View, TextInput, Button,
  TouchableOpacity, Text,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { HomeServices } from '../../../data/services/homeServices';
import { AdminServices } from '../../../data/services/adminServices';
import { convertImageToBase64 } from '../../../util/LifeCycle';
import Spinner from "react-native-loading-spinner-overlay";

const PrincipalOffer = () => {
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [ulrImage, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    id: '01',
    title: '',
    price: '',
    color: '',
    rating: '',
    description: '',
    percentOffer: '',
    rangeDay: '',
    type: '',
  });

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Se requieren permisos de la galería de fotos.');
      }
    })();
  }, []);

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
          Alert.alert("Actualizado", response.data.message);
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

    const mainOfferData = {
      image: ulrImage,
      id: formData.id,
      title: formData.title,
      color: '#' + formData.color,
      price: parseInt(formData.price),
      rating: formData.rating,
      description: formData.description,
      percentOffer: formData.percentOffer,
      type: formData.type,
      rangeDay: formData.rangeDay
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
    const response = await HomeServices.mainOffer(mainOfferData);
    return response;
  };

  const uploadImage = async (dataImage) => {
    const response = await AdminServices.uploadImage(dataImage);
    return response;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
          <Button title="Subir imagen" onPress={handleImageUpload} />
        </View>
        <TextInput
          placeholder="Título"
          value={formData.title}
          onChangeText={(text) => handleInputChange('title', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Precio"
          value={formData.price}
          onChangeText={(text) => handleInputChange('price', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Color"
          value={formData.color}
          onChangeText={(text) => handleInputChange('color', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Rating"
          value={formData.rating}
          onChangeText={(text) => handleInputChange('rating', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Descripción"
          value={formData.description}
          onChangeText={(text) => handleInputChange('description', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Porcentaje de oferta"
          value={formData.percentOffer}
          onChangeText={(text) => handleInputChange('percentOffer', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Días de rango"
          value={formData.rangeDay}
          onChangeText={(text) => handleInputChange('rangeDay', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Tipo"
          value={formData.type}
          onChangeText={(text) => handleInputChange('type', text)}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Text>Enviar formulario</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 240,
    height: 240,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default PrincipalOffer;
