import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import VerticalCards from '../Components/VerticalCards';
import HorizontalCards from '../Components/HorozontalCards';
import {RecommendList} from '../Components/RecommendList';
import {ProductList} from '../Components/ProductList';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import { PermissionsAndroid } from 'react-native';
import { ref, get, child, query, startAt, endAt } from "firebase/database";
import { database } from "../Firebase/firebase";
import { Height } from '@mui/icons-material';

const HomeScreen: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState({});
  const [apiResult, setApiResult] = useState([]);
  const [galleryPermission, setGalleryPermission] = useState('denied');
  const [vegetables,setVegitables] = useState([])
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  console.log("🚀 ~ file: HomeScreen.tsx:28 ~ vegetables:", vegetables)

  useEffect(() => {
    checkGalleryPermission();
  }, []);

  // useEffect(() => {
  //   const vegetableRef = ref(database, "vegetables");
  //   const milkRef = ref(database, "milk");
  //   const meatRef = ref(database, "meats");
  //   const fruitRef = ref(database, "fruits");


  //   onValue(vegetableRef, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log("🚀 ~ file: HomeScreen.tsx:41 ~ onValue ~ data:", data)
    
  //     if (data) {
  //       const transformedData = Object.keys(data).map((key) => ({
  //         id:data[key].id,
  //         name: data[key].name,
  //         price: data[key].price,
  //         image: data[key].image,
  //       }));
  //       setVegitables(transformedData);
  //     }
  //   });
  // }, [searchText]);
  const vegetableRef = ref(database, "vegetables");
    const milkRef = ref(database, "milk");
    const meatRef = ref(database, "meats");
    const fruitRef = ref(database, "fruits");

    const handleSearch = async () => {
      if (!searchText.trim()) {
        setSearchResults([]);
        return;
      }
  
      const searchWords = searchText.toLowerCase().split(' ');
  
      const results = await Promise.all([
        searchInTable(vegetableRef, 'vegetables', searchWords),
        searchInTable(milkRef, 'milk', searchWords),
        searchInTable(meatRef, 'meats', searchWords),
        searchInTable(fruitRef, 'fruits', searchWords),
      ]);
      console.log("🚀 ~ file: HomeScreen.tsx:76 ~ handleSearch ~ results:", results)
  
    
      const combinedResults = results.reduce((acc, cur) => acc.concat(cur), []);
  
      setVegitables(combinedResults);
    };
  
    const searchInTable = async (tableRef:any, tableName:any, searchWords:any) => {
      const result:any = [];
    
      const snapshot = await get(tableRef);
    
      if (snapshot.exists()) {
        const data = snapshot.val();
    
        Object.keys(data).forEach((key) => {
          const item = data[key];
          const itemName = item.name.toLowerCase();
    
          // Check if any search word matches the item name
          if (searchWords.some((word:any) => itemName.includes(word))) {
            result.push({
              id: key,
              tableName,
              ...item,
            });
          }
        });
      }
    
      return result;
    };


  const checkGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
  
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setGalleryPermission('granted');
      } else {
        setGalleryPermission('denied');
      }
    } catch (error) {
      console.log('Error checking gallery permissions:', error);
      setGalleryPermission('denied');
    }
  };

  const handleImagePicker = async () => {
    try {
      if (galleryPermission === 'granted') {
        const image = await ImagePicker.openPicker({
          mediaType: 'photo',
          cropping: false,
          includeBase64: true,
        });

        setSelectedImage({ uri: image.path });
        recognizeImage(image.data);
      } else {
        console.log('Gallery permissions denied.');
      }
    } catch (error) {
      console.log('ImagePicker Error:', error);
    }
  };

  const recognizeImage = async (base64Image:any) => {
    try {
      const API_KEY = 'AIzaSyC5fqa9oM0Em1HCT0GAJjnaDdrLK1cifYY';
      const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

      const requestBody = {
        requests: [
          {
            image: { content: base64Image },
            features: [
              { type: 'TEXT_DETECTION', maxResults: 5 },
              { type: 'OBJECT_LOCALIZATION', maxResults: 5 },
            ],
          },
        ],
      };

  
      const response = await axios.post(API_URL, requestBody);
  
      // const textDetectionResults = response.data.responses[0]?.textAnnotations || [];
      // const objectLocalizationResults = response.data.responses[0]?.localizedObjectAnnotations || [];
      // if (textDetectionResults.length !== 0 || objectLocalizationResults.length !== 0) {
      //   textSelection(textDetectionResults.length !== 0 ? textDetectionResults : objectLocalizationResults);
      // }
      // console.log('Text Detection Results:', textDetectionResults);
      // console.log('Object Localization Results:', objectLocalizationResults);
      if (response && response.data && response.data.responses) {
        const textDetectionResults = response.data.responses[0]?.textAnnotations || [];
        const objectLocalizationResults = response.data.responses[0]?.localizedObjectAnnotations || [];
      
        if (textDetectionResults.length !== 0) {
          textSelection(textDetectionResults, true); 
        } else if (objectLocalizationResults.length !== 0) {
          textSelection(objectLocalizationResults, false); 
        } else {
         
        }
      }
     
    } catch (error:any) {
      console.log('Google Cloud Vision API Error:', error.response.data.error);
    }
  };

  const handleImageChange = (value:any) => {
    setSearchText(value);
  };
  const textSelection = (text:any, isTextDetection:boolean) => {
    const product_names = ["rice", "basmati", "milk", "neilson", "tomato","orange","potato","lettuce","banana","chiken",];
    const uniqueMatchingTexts = new Set();
  
    text.map((item:any) => {
      const lowerCaseText = isTextDetection ? item.description.toLowerCase() : item.name.toLowerCase();
      const matchingProducts = product_names.filter((product) => lowerCaseText.includes(product));
      matchingProducts.forEach((product) => uniqueMatchingTexts.add(product));
    });
  
    const matchingTextArray = Array.from(uniqueMatchingTexts);
  
    setSearchText(matchingTextArray.join(" "));
  };
  
  return (
    <>
      <View style={styles.container}>
        <View style={styles.topHeader}>
          <TextInput
          value={searchText||""}
            placeholderTextColor={'#fff'}
            style={styles.input}
            placeholder="Search products or store"
            onChangeText={handleImageChange}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>search</Text>
        </TouchableOpacity>
          <View style={styles.imageContainer}>
            {/* <Image
              style={styles.topImg}
              source={require('../assets/photo.jpg')}
            /> */}
             <TouchableOpacity onPress={handleImagePicker}>
             <Image
              style={styles.topImg}
              source={require('../assets/upload.jpg')}
            />
      </TouchableOpacity>
           
          </View>
        </View>
        <View>
          {/* <FlatList
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
          /> */}
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* {selectedImage && (
        <Image source={selectedImage} style={{ width: 200, height: 200, marginBottom: 20 }} />
      )}
      {apiResult.length > 0 ? (
        <View>
          <Text>Labels:</Text>
          {apiResult.map((label) => (
            <Text key={label.description}>{label.description}</Text>
          ))}
        </View>
      ) : null} */}
      {galleryPermission === 'denied' && (
        <TouchableOpacity onPress={checkGalleryPermission}>
          <Text>Grant Gallery Permissions</Text>
        </TouchableOpacity>
      )}
      {galleryPermission === 'granted' && (
        <TouchableOpacity onPress={handleImagePicker}>
          <Text>Select Image</Text>
        </TouchableOpacity>
      )}
      
    </View>
        </View>
        <ScrollView>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <FlatList
              scrollEnabled={false}
              data={vegetables}
              numColumns={3}
              keyExtractor={(item, index) => String(item.id)}
              renderItem={({item}) => (
                <View style={{padding: 5}}>
                  <HorizontalCards
                    name={item.name}
                    price={item.price}
                    imageLink={item.image}
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
    color:"#fff",
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
  searchButton:{
    backgroundColor:"#fff",
    Height:30,
    width:80,
    color:"#000",
    marginTop:20,
    borderRadius:5,
    padding:5,
  },
  searchButtonText:{
    textAlign:"center",
    color:"#000"
  }
});

export default HomeScreen;
