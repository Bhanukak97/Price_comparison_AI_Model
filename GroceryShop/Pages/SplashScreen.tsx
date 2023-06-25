import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import logo from '../Images/logo2.png';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={logo}></Image>
      <Text style={styles.maintext}>Your easy Price Comparison App.</Text>
      <Text style={styles.description}>
        Search, compare prices, and find the best offers at stores near you.
      </Text>

      <TouchableOpacity style={styles.menuButton} onPress={()=>navigation.navigate('Location')}>
        <View>
          <Text>Get Started</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    height: '100%',
    // display:"flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A4BA0',
    padding: 32,
  },
  img: {
    width: 300,
    height: 300,
  },
  maintext: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  description: {
    color: '#B2BBCE',
    fontSize: 18,
    fontWeight: 'medium',
    marginBottom: 50,
    width: 250,
  },
  menuButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SplashScreen;
