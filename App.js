import React, { useState } from "react";
import {
  ScrollView,
  View,
  Image,
  Button,
  Alert,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "./uploadImage"; // this is where you put your code to handle uploading to the server
// import { uploacdImage } from "./uploadImage"; // this is where you put your code to handle uploading to the server

const MyComponent = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  async function handleChooseImage() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        // aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result);
      }
    } catch (E) {
      console.log(E);
    }
  }

  const handleUploadImage = async () => {
    try {
      if (!image) {
        Alert.alert("Please select an image first");
        return;
      }
      const response = await uploadImage(image);
      setResult(response.data);
      // console.log(response.data)
      // if (response.status === 200) {
      //   Alert.alert("Image uploaded successfully");
      // }
    } catch (err) {
      console.log(err);
      Alert.alert("Failed to upload image");
    }
  };

  return (
    <View
      style={styles.view_app
      
      }
    >
      <View style={styles.view_header}>
        <View style={styles.view_logo}>
          <Image
            source={require("app/bk1.png")}
            style={{ resizeMode: "contain", width: 120, height: 90 }}
          />
          <Image
            source={require("app/bk1.png")}
            style={{ resizeMode: "contain", width: 120, height: 90 }}
          />
        </View>
        <View
          style={{
            flex: 9,
            alignItems: "center",
          }}
        >
          <Text
            style={{ color: `#ffffff`, fontSize: "20", fontWeight: "bold" }}
          >
            PNEUMONIA DETECTED
          </Text>
        </View>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.ShowImage}>
          {image && (
            <Image
              source={{ uri: image.uri }}
              style={{ resizeMode: "contain", flex: 1 }}
            />
          )}
        </View>
        <View style={styles.view_button}>
          <Pressable style={styles.button1} onPress={handleChooseImage}>
            <Text style={styles.text}>Choose Image</Text>
          </Pressable>

          <Pressable style={styles.button2} onPress={handleUploadImage}>
            <Text style={styles.text}>Predict</Text>
          </Pressable>
        </View>
        <View style={styles.view_text}>
          <Text style={styles.text2}> Result: {result}</Text>
        </View>
        <View style={styles.view_text1}>
          <Text style={styles.titleText}>About</Text>
          <Text>
            Pneumonia is an infection that inflames the air sacs in one or both
            lungs. The air sacs may fill with fluid or pus (purulent material),
            causing cough with phlegm or pus, fever, chills, and difficulty
            breathing. A variety of organisms, including bacteria, viruses and
            fungi, can cause pneumonia.
            {"\n"}
            {"\n"}
            Pneumonia can range in seriousness from mild to life-threatening. It
            is most serious for infants and young children, people older than
            age 65, and people with health problems or weakened immune systems.
          </Text>
          <Text style={styles.titleText}>Symptoms</Text>
          <Text>
            The signs and symptoms of pneumonia vary from mild to severe,
            depending on factors such as the type of germ causing the infection,
            and your age and overall health. Mild signs and symptoms often are
            similar to those of a cold or flu, but they last longer. {"\n"}
            {"\n"}
            Signs and symptoms of pneumonia may include:
            {"\n"}• Chest pain when you breathe or cough
            {"\n"}• Confusion or changes in mental awareness (in adults age 65
            and older)
            {"\n"}• Cough, which may produce phlegm
            {"\n"}• Fatigue
            {"\n"}• Fever, sweating and shaking chills
            {"\n"}• Lower than normal body temperature (in adults older than age
            65 and people with weak immune systems)
            {"\n"}• Nausea, vomiting or diarrhea
            {"\n"}• Shortness of breath
          </Text>
          <Text style={styles.titleText}>Causes</Text>
          <Text>
            Many germs can cause pneumonia. The most common are bacteria and
            viruses in the air we breathe. Your body usually prevents these
            germs from infecting your lungs. But sometimes these germs can
            overpower your immune system, even if your health is generally
            good.Pneumonia is classified according to the types of germs that
            cause it and where you got the infection.
          </Text>
        </View>
        <View
          style={{
            height: 100,
          }}
        ></View>
        <View
          style={{
            height: 100,
            backgroundColor: "rgb(7, 0, 70)",
          }}
        ></View>
      </ScrollView>
    </View>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  view_app:{
  flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  ShowImage: {
    // zIndex:3,
    height: 450,
    width: 400,
    flex: 5,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  view_header: {
    height: 100,
    alignItems: "center",
    flexDirection: "row",
    // justifyContent: "space-around",
    backgroundColor: "rgb(7, 0, 70)",
    marginBottom: 20,
  },
  view_logo: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  view_button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  view_text: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  view_text1: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 5,
  },
  button1: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 50,
    borderRadius: 4,
    backgroundColor: "green",
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: 200,
    height: 50,
    marginBottom: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "red",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  text2: {
    marginTop: 5,
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    zIndex: 2,
  },
  titleText: {
    display: "flex",
    justifyContent: "flex-start",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});
