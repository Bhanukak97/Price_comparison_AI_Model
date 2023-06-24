import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import fruit from '../Images/fruits.png';

const LocationScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={fruit}></Image>
      
      <Text style={styles.description}>
      Find the latest deals at stores near you.
      </Text>

      <TouchableOpacity style={styles.locationButton}>
        <View>
          <Text style={styles.lButtonText}>Set Location</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.postalButton}>
        <View>
          <Text style={styles.pButtonText}>Enter Postal Code</Text>
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
    backgroundColor: '#fff',
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
    color: '#000',
    fontSize: 24,
    fontWeight: 'medium',
    marginBottom: 50,
    width: 250,
    marginTop:50
  },
  locationButton: {
    backgroundColor: '#fff',
    borderColor:"#2A4BA0",
    borderWidth:2,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
  },
  postalButton: {
    backgroundColor: '#2A4BA0',
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
  lButtonText:{
    fontSize: 20,
    fontWeight: 'normal',
    color: '#2A4BA0',
  },
  pButtonText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  }
});

export default LocationScreen;
