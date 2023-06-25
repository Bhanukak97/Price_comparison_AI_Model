import React, { useState } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import fruit from '../Images/fruits.png';
import { Modal } from 'antd';
import { MaterialDialog } from 'react-native-material-dialog';


const LocationScreen:React.FC = () => {
const [isVisibleLocation, setVisibleLocation] = useState(false)
const [isVisiblePostal, setVisiblePostal] = useState(false)
const [isVisible, setVisible] = useState(false)

const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={fruit}></Image>
      
      <Text style={styles.description}>
      Find the latest deals at stores near you.
      </Text>

      <TouchableOpacity onPress={()=>setVisibleLocation(true)} style={styles.locationButton}>
        <View>
          <Text style={styles.lButtonText}>Set Location</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.postalButton} onPress={()=>setVisiblePostal(true)}>
        <View>
          <Text style={styles.pButtonText}>Enter Postal Code</Text>
        </View>
      </TouchableOpacity>
      <MaterialDialog
  title="Use Google's Location Service?"
  visible={isVisibleLocation}
  onOk={() => setVisibleLocation(false)}
  onCancel={() => setVisibleLocation(false)}>
  <Text >
    Let Google help apps determine location. This means sending anonymous
    location data to Google, even when no apps are running.
  </Text>
</MaterialDialog>
<MaterialDialog
  title="Set Your Postal Code"
  visible={isVisiblePostal}
  onOk={() => setVisiblePostal(false)}
  onCancel={() => setVisiblePostal(false)}>
  <TextInput placeholder='Postal Code'/>
</MaterialDialog>
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
