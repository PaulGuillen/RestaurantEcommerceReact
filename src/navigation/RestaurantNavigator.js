import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Perfil from "../screens/home/Perfil";
import HomeRestaurant from "../screens/admin/restaurant/HomeRestaurant";
import CategoryRestaurant from "../screens/admin/restaurant/CategoryRestaurant";
import ProductsRestaurant from "../screens/admin/restaurant/ProductsRestaurant";
import OrderNavigator from "./OrderNavigator";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeIcon = ({ color, size }) => (
  <Ionicons name="home" color={color} size={size * 1} />
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

const PrincipalNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Inicio"
        component={HomeRestaurant}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Categorias"
        component={CategoryRestaurant}
        options={{
          tabBarIcon: CategoryIcon,
        }}
      />
      <Tab.Screen
        name="Productos"
        component={ProductsRestaurant}
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
