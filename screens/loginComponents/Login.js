import { View, Text } from "react-native";
import { useBackButtonHandler } from "../../util/LifeCycle.js";
const Login = () => {
  useBackButtonHandler();

  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default Login;
