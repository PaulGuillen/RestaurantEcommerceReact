import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserBag from "../screens/order/userBag";

const Stack = createNativeStackNavigator();

const OrderNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserBag" component={UserBag} />
    </Stack.Navigator>
  );
};

export default OrderNavigator;
