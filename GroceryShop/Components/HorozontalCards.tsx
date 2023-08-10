import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  
  Image,
  TextInput,
  ImageProps,
} from 'react-native';
import fruit from '../assets/fruits.png';
import {MaterialDialog} from 'react-native-material-dialog';

type Props = {
  imageLink: Image;
  name: String;
  price?: String;
  description?: String;
};

const HorizontalCards: React.FC<Props> = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.middle}>
        <View style={styles.imgWrapper}>
          <Image style={styles.img} source={{uri:props.imageLink}} />
        </View>
        <View style={{borderColor:"#E0E2EE", borderWidth:0.5, marginTop:10}}/>
        <View style={styles.TextContainer}>
          <Text style={styles.text}>{props.name}</Text>
          <Text style={styles.descriptionText}>{props.description}</Text>
          <Text style={styles.priceText}>{props.price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: 124,
    height: 194,
    backgroundColor: '#F8F9FB',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    padding: 5,
    flexDirection: 'column',
  },
  TextContainer: {
    padding: 5,
  },
  text: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  descriptionText: {
    color: '#616A7D',
    fontSize: 12,
    marginTop:5
  },
  priceText: {
    color: '#000',
    fontSize: 14,
    marginTop:5

  },
  img: {
    width: 68,
    height: 68,
  },
  imgWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HorizontalCards;
