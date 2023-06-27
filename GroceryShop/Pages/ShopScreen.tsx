import React from 'react';
import {StyleSheet, View, Image, Text, FlatList, TouchableOpacity} from 'react-native';
import {GroceryList} from '../Components/GroceryList';

const ShopScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={GroceryList}
        numColumns={3}
        keyExtractor={(item, index) => String(item.id)}
        renderItem={({item}) => (
          <View style={styles.wrapper}>
            <Image style={styles.img} source={item.Image}></Image>
            <View style={styles.description}>
              <Text>{item.name}</Text>
            </View>
          </View>
        )}
      />
       <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate("Home")}>
          <Text style={styles.pButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  wrapper: {
    margin: 10,
    flexDirection: 'column',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  buttonContainer:{
  },
  continueButton: {
    backgroundColor: '#2A4BA0',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    margin:20,
    width:'80%'
  },
  pButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign:'center'
  },
  maintext: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  description: {
    color: '#000',
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
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

export default ShopScreen;
