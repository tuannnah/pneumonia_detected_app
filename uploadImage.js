import { Platform } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
const uploadImage = async (image) => {
  let formData = new FormData();
  
  if (Platform.OS === 'ios') {
    const manipResult = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ resize: { width: 300 } }],
      { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
    );
    formData.append('file', {
      uri: manipResult.uri,
      type: 'image/jpeg',
      name: 'image.jpg'
    });
  } else {
    formData.append('file', {
      uri: image.uri,
      type: 'image/jpeg',
      name: 'image.jpg'
    });
  }
  
  const options = {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    }
  };

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  
  const response=await axios.post('http://172.20.10.2:5000/predict',formData,config)
  console.log(response.data)
  return response;
}

export { uploadImage };