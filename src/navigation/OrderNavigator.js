import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserBag from "../screens/order/userBag";
import Address from "../screens/order/Address";

const Stack = createNativeStackNavigator();

const OrderNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserBag" component={UserBag} />
      <Stack.Screen name="Address" component={Address} />
    </Stack.Navigator>
  );
};

export default OrderNavigator;
