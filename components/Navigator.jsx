import { createStackNavigator } from "@react-navigation/stack";
import ProductList from "./data/Product";
import AddProduct from "./AddProduct";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="ProductList">
    <Stack.Screen name="ProductList" component={ProductList} />
    <Stack.Screen name="AddProduct" component={AddProduct} />
  </Stack.Navigator>
);
