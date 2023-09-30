import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import Promotions from "../screens/home/Promotions";
import Perfil from "../screens/home/Perfil";
import { Ionicons } from "@expo/vector-icons";
import Favorites from "../screens/home/Favorites";

const Tab = createBottomTabNavigator();

const HomeIcon = ({ color, size }) => (
  <Ionicons name="home" color={color} size={size * 1} />
);

const NotificationsIcon = ({ color, size }) => (
  <Ionicons name="notifications" color={color} size={size * 1} />
);

const HeartIcon = ({ color, size }) => (
  <Ionicons name="heart" color={color} size={size * 1} />
);

const PersonIcon = ({ color, size }) => (
  <Ionicons name="person" color={color} size={size * 1} />
);

const HomeNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Promociones"
        component={Promotions}
        options={{
          tabBarIcon: NotificationsIcon,
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={Favorites}
        options={{
          tabBarIcon: HeartIcon,
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

export default HomeNavigator;
