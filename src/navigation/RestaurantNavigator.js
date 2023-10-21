import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from "@expo/vector-icons";
import Perfil from "../screens/client/home/Perfil";
import OrderNavigator from "./OrderNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native";
import OrderRestaurantPayed from "../screens/admin/home/OrderRestaurantPayed";
import OrderRestaurantSend from "../screens/admin/home/OrderRestaurantSend";
import OrderRestaurantDelivered from "../screens/admin/home/OrderRestaurantDelivered";
import GeneralProduct from "../screens/admin/products/GeneralProduct";
import Categories from "../screens/admin/products/Categories";
import PrincipalOffer from "../screens/admin/offer/PrincipalOffer";
import CommonOffer from "../screens/admin/offer/CommonOffer";

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const HomeIcon = ({ color, size }) => (
  <Ionicons name="home" color={color} size={size} />
);

const CategoryIcon = ({ color, size }) => (
  <Ionicons name="md-newspaper" color={color} size={size * 1} />
);

const ProductIcon = ({ color, size }) => (
  <Ionicons name="md-restaurant" color={color} size={size * 1} />
);

const PersonIcon = ({ color, size }) => (
  <Ionicons name="person" color={color} size={size * 1} />
);

const HomeRestaurantNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopTab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            paddingTop: 50,
          },
        }}
      >
        <TopTab.Screen name="Pagado" component={OrderRestaurantPayed} />
        <TopTab.Screen name="En Camino" component={OrderRestaurantSend} />
        <TopTab.Screen name="Entregado" component={OrderRestaurantDelivered} />
      </TopTab.Navigator>
    </SafeAreaView>
  );
};

const ProductsRestaurantNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopTab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            paddingTop: 50,
          },
        }}
      >
        <TopTab.Screen name="Productos General" component={GeneralProduct} />
        <TopTab.Screen name="Categorias" component={Categories} />
      </TopTab.Navigator>
    </SafeAreaView>
  );
};

const OfferRestaurantNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopTab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            paddingTop: 50,
          },
        }}
      >
        <TopTab.Screen name="Oferta Principal" component={PrincipalOffer} />
        <TopTab.Screen name="Oferta Comun" component={CommonOffer} />
      </TopTab.Navigator>
    </SafeAreaView>
  );
};

const PrincipalNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Inicio"
        component={HomeRestaurantNavigator}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Productos"
        component={ProductsRestaurantNavigator}
        options={{
          tabBarIcon: CategoryIcon,
        }}
      />
      <Tab.Screen
        name="Ofertas"
        component={OfferRestaurantNavigator}
        options={{
          tabBarIcon: ProductIcon,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: PersonIcon,
        }}
      />
    </Tab.Navigator>
  );
};

const RestaurantNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeRestaurant" component={PrincipalNavigator} />
      <Stack.Screen name="Order" component={OrderNavigator} />
    </Stack.Navigator>
  );
};

export default RestaurantNavigator;
