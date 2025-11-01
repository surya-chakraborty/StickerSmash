import { View, StyleSheet, ImageSourcePropType, Platform } from "react-native";
import { useEffect, useState, useRef } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import domtoimage from 'dom-to-image';

import * as MediaLibrary from 'expo-media-library'
import { captureRef } from 'react-native-view-shot'

// import { Link } from "expo-router";
// import {Image} from "expo-image"
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";

import * as ImagePicker from 'expo-image-picker'
// import { withDecay } from "react-native-reanimated";
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


5. Create emoji picker modal - react native has modal compoent that used to draw attention of the user obver anything else by dispklayying it on top of all the content on the app
alert() works on the same model principle too that we have already previously used in the button component.
First of all craeted a button layout component that renders conditionally afetr image slection with add emoji, refresh and save button
then we added a stcker modal and dlatlist with several stciker that after clicking as a n pressable button it adds to the image

6. Add Gestures - now we will use gestures using react-native gestures library (pan and tap) and animate them using reanimated library.

7. Take screenshot and save it to mobile libarary  - We'll use 'react-native-view-shot' to take a screenshot and 'expo-media-library' to save an image on device's media library.
installation - npx expo install react-native-view-shot expo-media-library
** For web platform we iused dom-to-image libary to save it as a screenshot

8. Configure  status bar, splash screen and app icon - app details before deploying our app to an app store, such as theming the status bar, customizing the app icon, and splash screen.
In the parent layout we just need to  import { StatusBar } from 'expo-status-bar'; and add StatusBar compont with desired style props , afetr the stack within parent react fragments, that will do it all
for splash screen and app icon, expo already configured it in app.json file we just need to rename our icons same as that and have it in the same path on the asssests/images folder

*/
export default function Index() {

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined)

  const [showAppOptions, setShowAppOptions] = useState<boolean>(false)

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined)

  const [permissionRequest, requestPermission] = MediaLibrary.usePermissions()

  const ImageRef = useRef<View>(null)

  useEffect(() => {
    if(!permissionRequest?.granted){
      requestPermission()
    }
  }, [])
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

  const onReset = () => {
    setShowAppOptions(false);
  }

  const onAddSticker = () => {
    setIsModalVisible(true)
  }

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    if(Platform.OS !== 'web'){
      try{
        const localUri = await captureRef(ImageRef, {
          height: 440,
          quality: 1
        })

        await MediaLibrary.saveToLibraryAsync(localUri)
        if(localUri){
          alert('Saved!')
        }
      } catch(e){
        console.log(e)
      }
    } else {
      try{
        const dataUrl = await domtoimage.toJpeg(ImageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        })

        let link = document.createElement('a')
        link.download = 'sticker-smash.jpeg'
        link.href = dataUrl
        link.click()

      } catch(e){
        console.log(e)
      }
    }
    
  }

  return (
    <GestureHandlerRootView
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <View ref={ImageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceHolderImage} selectedImage={selectedImage}/>
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji}></EmojiSticker>}
        </View>
      </View>
      {/* Optionally show the emoji picker buttons */}
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset}/>
            <CircleButton onPress={onAddSticker}/>
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync}/>
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
        <Button label="Choose a photo" theme="primary" onPress={pickImageAsync}/>
        <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
      </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
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
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row'
  }
})
