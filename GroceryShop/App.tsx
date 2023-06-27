import React from 'react';
// import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import SplashScreen from './Pages/SplashScreen';
import LocationScreen from './Pages/LocationScreen';
import ShopScreen from './Pages/ShopScreen';
import HomeScreen from './Pages/HomeScreen';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Spalsh"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Location"
          component={LocationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Shops"
          component={ShopScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    margin: 10,
  },
});

export default App;
