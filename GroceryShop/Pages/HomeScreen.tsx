import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import VerticalCards from '../Components/VerticalCards';
import HorizontalCards from '../Components/HorozontalCards';
import {RecommendList} from '../Components/RecommendList';
import {ProductList} from '../Components/ProductList';

const HomeScreen: React.FC = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.topHeader}>
          <TextInput
            placeholderTextColor={'#fff'}
            style={styles.input}
            placeholder="Search products or store"
          />
          <View style={styles.imageContainer}>
            <Image
              style={styles.topImg}
              source={require('../assets/photo.jpg')}
            />
            <Image
              style={styles.topImg}
              source={require('../assets/upload.jpg')}
            />
          </View>
        </View>
        <View>
          <FlatList
            horizontal
            data={RecommendList}
            numColumns={1}
            keyExtractor={(item, index) => String(item.id)}
            renderItem={({item}) => (
              <ScrollView style={{padding: 10}}>
                <VerticalCards
                  text={item.name}
                  price={item.price}
                  offer={item.offer}
                  imageLink={require('../assets/gallery.png')}
                />
              </ScrollView>
            )}
          />
        </View>
        <ScrollView>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <FlatList
              scrollEnabled={false}
              data={ProductList}
              numColumns={3}
              keyExtractor={(item, index) => String(item.id)}
              renderItem={({item}) => (
                <View style={{padding: 5}}>
                  <HorizontalCards
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    imageLink={require('../assets/gallery-gray.png')}
                  />
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#153075',
    borderRadius: 10,
    width: '80%',
    textAlign: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  img: {
    width: 300,
    height: 300,
  },
  topImg: {
    width: 68,
    height: 68,
    borderRadius: 100,
    margin: 10,
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
  topHeader: {
    backgroundColor: '#2A4BA0',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
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
