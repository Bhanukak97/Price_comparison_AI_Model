import React, { useState } from "react";
import { ref, push, child, set } from "firebase/database";
import { database } from "../Firebase/firebase";
import { Text, TextInput, TouchableOpacity, View } from "react-native";


const AddData = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const handleUserAdd = () => {
    const vegitableId = push(child(ref(database), "vegetables")).key;
    set(ref(database, "vegetables/" + vegitableId), {
      id: vegitableId,
      name: name,
      price: price,
      image:image
    })
      .then(() => {
        setName('');
        setImage('');
      })
      .catch((error) => {
      console.log("🚀 ~ file: dataadding.tsx:24 ~ handleUserAdd ~ error:", error)

      });
  };

  const handleImageChange = (value:any) => {
    setImage(value);
  };
  const handleNameChange = (value:any) => {
    setName(value);
  };
  const handlePriceChange = (value:any) => {
    setPrice(value);
  };

  return (
    <View>
    
          <TextInput
            placeholder="Username"
            value={name}
            onChangeText={handleNameChange}
          />
          <TextInput
            placeholder="price"
            value={price}
            onChangeText={handlePriceChange}
          />
         <TextInput
             placeholder="image"
             value={image}
             onChangeText={ handleImageChange}
          />
          
          <TouchableOpacity onPress={handleUserAdd}>
            <Text>Login</Text>
          </TouchableOpacity>

  
      </View>
  );
};

export default AddData;
