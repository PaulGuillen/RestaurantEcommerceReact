import { StyleSheet, Text, View, Alert, FlatList } from 'react-native'
import { OrderService } from '../../../data/services/orderServices';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

const OrderRestaurantPayed = () => {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await OrderService.getAllOrdersPayed();
      if (response.success) {
        setData(response.data);
      } else {
        Alert.alert("Error", response.error);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cargar los datos");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.orderID}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.titleOrderContainer}>
            <Text style={styles.title}>Orden # {item.orderID}</Text>
          </View>
          <View style={styles.containerDescription}>
            <View style={styles.containerDistrict}>
              <Text style={styles.titleDistrict}>
                Entregar en : {item.addressSelected.district}
              </Text>
            </View>
            <View style={styles.containerClient}>
              <Text style={styles.titleClient}>
                Cliente : {item.fullName}
              </Text>
            </View>
          </View>
        </View>
      )}
    />
  )
}

export default OrderRestaurantPayed

const styles = StyleSheet.create({})