import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserBag from "../screens/order/userBag";
import Address from "../screens/order/Address";
import CreateAddress from "../screens/order/CreateAddress";
import Maps from "../screens/order/Maps";
import Payment from "../screens/order/Payment";
import SuccessOrder from "../screens/order/SuccessOrder";

const Stack = createNativeStackNavigator();

const OrderNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserBag" component={UserBag} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="CreateAddress" component={CreateAddress} />
      <Stack.Screen name="Maps" component={Maps} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="SuccessOrder" component={SuccessOrder} />
    </Stack.Navigator>
  );
};

export default OrderNavigator;
