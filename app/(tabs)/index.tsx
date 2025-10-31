import { View, StyleSheet } from "react-native";
// import { Link } from "expo-router";
// import {Image} from "expo-image"
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";


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
*/
export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceHolderImage}/>
      </View>
      <View style={styles.footerContainer}>
        <Button label="Choose a photo" theme="primary"/>
        <Button label="Use this photo"/>
      </View>
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
