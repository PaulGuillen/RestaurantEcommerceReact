import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, data) => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
  } catch (error) {
    console.error('Error al guardar el objeto JSON:', error);
  }
};

export const loadData = async (key) => {
  try {
    const jsonData = await AsyncStorage.getItem(key);
    if (jsonData !== null) {
      const data = JSON.parse(jsonData);
      return data;
    } else {
      console.log(`No se encontró ningún objeto JSON en la clave ${key}`);
      return null;
    }
  } catch (error) {
    console.error('Error al recuperar el objeto JSON:', error);
    return null;
  }
};

export const saveString = async (key, stringValue) => {
  try {
    await AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    console.error('Error al guardar la cadena:', error);
  }
};

export const loadString = async (key) => {
  try {
    const stringValue = await AsyncStorage.getItem(key);
    if (stringValue !== null) {
      return stringValue;
    } else {
      console.log(`No se encontró ninguna cadena en la clave ${key}`);
      return null;
    }
  } catch (error) {
    console.error('Error al recuperar la cadena:', error);
    return null;
  }
};