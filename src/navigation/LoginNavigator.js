import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/loginComponents/Login";
import Register from "../screens/loginComponents/Register";
import MainNavigator from "./HomeNavigator";

const Stack = createNativeStackNavigator();

const LoginNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="HomeNavigator" component={MainNavigator} />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
