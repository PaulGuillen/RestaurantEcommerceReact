import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {} from 'react-native';
import FirstView from '../screens/onBoarding/FirstView';
import SecondView from '../screens/onBoarding/SecondView';
import ThirdView from '../screens/onBoarding/ThirdView';
import LoginNavigator from './LoginNavigator';

const Stack = createNativeStackNavigator();

const OnBoardingNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='FirstView' component={FirstView} />
        <Stack.Screen name='SecondView' component={SecondView} />
        <Stack.Screen name='ThirdView' component={ThirdView} />
        <Stack.Screen name='LoginComponent' component={LoginNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default OnBoardingNav;
