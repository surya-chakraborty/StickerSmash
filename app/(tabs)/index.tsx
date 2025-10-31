import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
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


*/
export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>Hello React Native via expo 👋</Text>
      <Link href="/about" style={styles.button}>
      Go to About screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: "center",
        alignItems: "center",
      },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff'
  }
})
