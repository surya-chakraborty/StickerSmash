import { View, StyleSheet } from "react-native";
import { useState } from "react";
// import { Link } from "expo-router";
// import {Image} from "expo-image"
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import * as ImagePicker from 'expo-image-picker'
// import { Assets } from "@react-navigation/elements";

const PlaceHolderImage = require('@/assets/images/background-image.png')
/*
This file is the entry point to our app
Expo - is framework built on top of react native that provides file-based 
routing, standerd library of native modules and much more.

Creating a fresh project - npx create-expo-app@latest 
Reset the project - npm run reset-project

Run - npx expo start {--tunnel via ngrok}

1. Creating styles object using Stylesheet from react native and applying it to components.

2. Expo router - uses file based structure for routing with index.tsx naming as '/' route to the parent folder with individual _layout.tsx for each folder or nested route and a parent _layout.tsx for common tab elements and header element.
What is Stack ? - A stack navigator is the foundation for navigating between different screens in an app. 

Here the root layout.tsx
export default function RootLayout() {
  return (
  <Stack>
    <Stack.Screen name="index" options={{title: 'Home'}}/>
    <Stack.Screen name="about" options={{title: 'About'}}/>
  </Stack>
  );
}
The title in the root layout,tsx is show on the top ledt @android device

**Not found page - '+not-found.tsx' is the common not found page used in expo react-native projects

**Tabs view impleneted with several props and ionicons expo-icon library

3. Creating our first page - The Home page
Image compoent from expo-router
What is '@' here? - The @ symbol is a custom path alias for importing custom components and other modules instead of relative paths. Expo CLI automatically configures it in tsconfig.json.

** Creating Button Component - React Native includes a few different components for handling touch events, but <Pressable> is recommended for its flexibility. It can detect single taps, long presses, trigger separate events when the button is pushed in and released, and more.
Created a common buttton compoent and added default styles and conditionally added styles too for diffrent feel

4. Using an Image Picker - expo-image-picker provides launchImageLibraryAsync() method to display the system UI by choosing an image or a video from the device's media library. We'll use the primary themed button created in the previous chapter to select an image from the device's media library and create a function to launch the device's image library to implement this functionality.
We will create a function that will invoke the imagepicker and will pass that function as a prop to the primary button component
Here's example log value of the slected image -  LOG  {"assets": [{"assetId": null, "base64": null, "duration": null, "exif": null, "fileName": "b0b5f809-4f14-4a24-9e1b-050b71b244d9.png", "fileSize": 28407, "height": 2400, "mimeType": "image/png", "rotation": null, "type": "image", "uri": "file:///data/user/0/host.exp.exponent/cache/ImagePicker/b0b5f809-4f14-4a24-9e1b-050b71b244d9.png", "width": 1080}], "canceled": false}


5. Create emoji picker model - react native has modal compoent that used to draw attention of the user obver anything else by dispklayying it on top of all the content on the app
alert() works on the same model principle too that we have already previously used in the button component.



*/
export default function Index() {

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined)

  const [showAppOptions, setShowAppOptions] = useState<boolean>(false)

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1
    })
    if(!result.canceled){
      // console.log(result)
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true)
    }
    else{
      alert("You did not select any image.")
    }
  }
  return (
    <View
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceHolderImage} selectedImage={selectedImage}/>
      </View>
      {/* Optionally show the emoji picker buttons */}
      {showAppOptions ? (
        <View/> 
      ) : (
        <View style={styles.footerContainer}>
        <Button label="Choose a photo" theme="primary" onPress={pickImageAsync}/>
        <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
      </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
        flex: 1,
        backgroundColor: '#25292e',
        // justifyContent: "center",
        alignItems: "center",
      },
  imageContainer: {
    flex: 1,
  }, 
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
})
