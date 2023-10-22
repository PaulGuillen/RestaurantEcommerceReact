import { useState, useEffect } from 'react';
import {
  StyleSheet, ScrollView, Image, View, TextInput, Button,
  TouchableOpacity, Text,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AdminServices } from '../../../data/services/adminServices';
import { convertImageToBase64 } from '../../../util/LifeCycle';
import Spinner from "react-native-loading-spinner-overlay";

const CommonOffer = () => {
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
  const circles = ['#A7D397', '#FFF2D8', '#FF6969', '#35A29F'];

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

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
      title: formData.title,
      color: selectedColor,
      price: parseInt(formData.price),
      description: formData.description,
      percentOffer: formData.percentOffer,
      type: formData.type,
      rangeDay: formData.rangeDay
    };

    setLoading(true);
    try {
      const response = await commonOffer(mainOfferData);
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

  const commonOffer = async (commonOfferData) => {
    const response = await AdminServices.commonOffer(commonOfferData);
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
          placeholder="Nombre producto"
          value={formData.title}
          onChangeText={(text) => handleInputChange('title', text)}
          style={styles.textTitle}
        />
        <View style={styles.horizontal}>
          <TextInput
            placeholder="Precio"
            style={styles.textPrice}
            value={formData.price}
            onChangeText={(text) => handleInputChange('price', text)}
          />
          <TextInput
            placeholder="Descuento %"
            value={formData.percentOffer}
            onChangeText={(text) => handleInputChange('percentOffer', text)}
            style={styles.textOfferDiscount}
          />
        </View>

        <Text style={styles.textColorBackground}>
          Colores de fondo
        </Text>

        <View style={styles.horizontal}>
          {circles.map((circleColor, index) => (
            <TouchableOpacity
              key={index}
              style={styles.touchableContainer}
              onPress={() => handleColorSelection(circleColor)}
            >
              <View
                style={[
                  styles.circularFirst,
                  {
                    backgroundColor: circleColor,
                    borderWidth: selectedColor === circleColor ? 1 : 0,
                    borderColor: 'black',
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          placeholder="Descripción"
          multiline={true}
          value={formData.description}
          onChangeText={(text) => handleInputChange('description', text)}
          style={styles.descriptionText}
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

  textTitle: {
    width: '80%',
    borderBottomWidth: 2,
    borderBottomColor: '#D0D4CA',
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 6,
    marginBottom: 10,
  },

  horizontal: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textPrice: {
    width: '46%',
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#D0D4CA',
    marginBottom: 10,
    paddingBottom: 6,
  },

  textOfferDiscount: {
    width: '48%',
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#D0D4CA',
    marginBottom: 10,
    paddingBottom: 6,
  },

  textColorBackground: {
    fontSize: 14,
    marginTop: 10,
    width: '80%',
  },
  touchableContainer: {
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularFirst: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  descriptionText: {
    width: '80%',
    fontSize: 14,
    marginTop: 14,
    borderBottomWidth: 2,
    borderBottomColor: '#D0D4CA',
    paddingBottom: 10,
    justifyContent: "center",
    maxHeight: 200,
  },
});

export default CommonOffer;
