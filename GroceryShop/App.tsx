import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import SplashScreen from './Pages/SplashScreen';
import LocationScreen from './Pages/LocationScreen';
import ShopScreen from './Pages/ShopScreen';
import HomeScreen from './Pages/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from './Pages/ProfileScreen';
import AddData from './Pages/dataadding';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'More') {
            iconName = focused
              ? 'ios-ellipsis-vertical'
              : 'ios-ellipsis-vertical-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="More" component={ShopScreen} />
    </Tab.Navigator>
  );
}

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Tab.Screen name="location" component={LocationScreen} />
        <Stack.Screen name="shops" component={ShopScreen} />
        <Stack.Screen name="home" component={HomeTabs} />
        <Stack.Screen name="add" component={AddData} />
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
