import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./components/header";
import SignUp from "./assets/screens/signup";
import Login from "./assets/screens/login";
import Home from "./assets/screens/pages/home";
import ProductList from "./components/data/Product";
import Notification from "./assets/screens/Notifications/Notification";
import ImagePicker from "./components/ImagePicker";
import AddProduct from "./components/AddProduct";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="products list" component={ProductList} />
          <Stack.Screen name="add-product" component={AddProduct} />
          <Stack.Screen name="upload-modal" component={ImagePicker} />
          <Stack.Screen name="notification" component={Notification} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
    paddingHorizontal: 20,
  },
});
