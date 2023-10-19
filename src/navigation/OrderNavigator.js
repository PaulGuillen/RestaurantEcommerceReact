import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserBag from "../screens/client/order/userBag";
import Address from "../screens/client/order/Address";
import CreateAddress from "../screens/client/order/CreateAddress";
import Maps from "../screens/client/order/Maps";
import Payment from "../screens/client/order/Payment";
import SuccessOrder from "../screens/client/order/SuccessOrder";

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
