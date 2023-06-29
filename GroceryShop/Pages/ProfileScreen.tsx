import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const ProfileScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      
      <Text style={styles.description}>
Profile Page      </Text>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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

export default ProfileScreen;
