import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ImageProps,
} from 'react-native';
import fruit from '../assets/fruits.png';
import {MaterialDialog} from 'react-native-material-dialog';

type Props = {
  imageLink: Image;
  text: String;
  price?: String;
  offer?: String;
};

const VerticalCards: React.FC<Props> = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.middle}>
        <View style={styles.imgWrapper}>
          <Image style={styles.img} source={props.imageLink} />
        </View>
        <View style={styles.TextContainer}>
          <Text style={styles.text}>{props.text}</Text>
          <Text style={styles.priceText}>{props.price}</Text>
          <Text style={styles.offerText}>{props.offer}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: 269,
    height: 123,
    backgroundColor: '#F9B023',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    padding: 5,
    flexDirection: 'row',
  },
  TextContainer: {
    padding: 5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  offerText: {
    color: '#fff',
    fontSize: 16,
  },
  priceText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  img: {
    width: 70,
    height: 68,
  },
  imgWrapper: {
    paddingRight: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VerticalCards;
