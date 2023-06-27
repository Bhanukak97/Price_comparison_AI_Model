import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import fruit from '../assets/fruits.png';
import {MaterialDialog} from 'react-native-material-dialog';

const HomeScreen: React.FC = ({navigation}) => {
  const [isVisibleLocation, setVisibleLocation] = useState(false);
  const [isVisiblePostal, setVisiblePostal] = useState(false);
  const [locationText, setLocationText] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
    // padding: 32,
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
    marginTop: 50,
  },
  topHeader:{
backgroundColor:'#2A4BA0',
height:250,
width:'100%'
  },
  locationButton: {
    backgroundColor: '#fff',
    borderColor: '#2A4BA0',
    borderWidth: 2,
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
  lButtonText: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#2A4BA0',
  },
  pButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HomeScreen;
