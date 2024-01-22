import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal, // Import Modal
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import axios from "axios";
import AddProduct from "../AddProduct";
import { useNavigation } from "@react-navigation/native";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isAddProductVisible, setAddProductVisible] = useState(false);
  const [editProductData, setEditProductData] = useState(null);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [updatedProductData, setUpdatedProductData] = useState({});
  const navigation = useNavigation();

  const openUpdateModal = (productData) => {
    setUpdatedProductData(productData);
    setUpdateModalVisible(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalVisible(false);
  };

  const handleUpdatePress = async () => {
    try {
      const response = await axios.put(
        `https://mobiledevelopapi.onrender.com/food/updatefood/${updatedProductData._id}`,
        updatedProductData
      );

      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === updatedProductData._id
              ? { ...product, ...updatedProductData }
              : product
          )
        );

        closeUpdateModal();
      } else {
        console.error("Error updating product");
      }
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const openAddProduct = () => {
    setAddProductVisible(true);
  };

  const closeAddProduct = () => {
    setAddProductVisible(false);
  };

  const handleOptionsPress = (productId) => {
    setSelectedProductId(productId === selectedProductId ? null : productId);
  };

  const handleOptionSelected = async (option, productId) => {
    if (option === "update") {
      navigation.navigate("add-product", { productId });
    }
    if (option === "delete") {
      try {
        const response = await axios.delete(
          `https://mobiledevelopapi.onrender.com/food/deletefood/${productId}`
        );

        if (response.status === 200) {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== productId)
          );
        } else {
          console.error("Error deleting product");
        }
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://mobiledevelopapi.onrender.com/food/getAll"
      );
      setProducts(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error while fetching:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      {item.image && (
        <Image style={styles.productImage} source={{ uri: item.image }} />
      )}
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productDescription}>{item.categoryName}</Text>
      </View>
      <View>
        <TouchableWithoutFeedback onPress={() => handleOptionsPress(item._id)}>
          <View style={styles.optionsButton}>
            <Icon
              name="more-vertical"
              size={24}
              color="#888"
              style={styles.iconStyle}
            />
          </View>
        </TouchableWithoutFeedback>

        {selectedProductId === item._id && (
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              onPress={() => handleOptionSelected("delete", item._id)}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openUpdateModal(item)}>
              <Text>Update</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  const handleWrapperPress = () => {
    setSelectedProductId(null);
  };

  return (
    <TouchableWithoutFeedback onPress={handleWrapperPress}>
      <View style={styles.container}>
        <Text style={styles.header}>List of Products:</Text>
        <TouchableOpacity
          onPress={openAddProduct}
          style={styles.newProductButton}
        >
          <Text
            style={styles.newProductButtonText}
            onPress={() => navigation.navigate("add-product")}
          >
            + New Product
          </Text>
        </TouchableOpacity>

        <FlatList
          data={products}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderItem}
        />

        <Modal
          visible={isUpdateModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeading}>Update Product</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Updated Title"
                value={updatedProductData.title}
                onChangeText={(text) =>
                  setUpdatedProductData((prevData) => ({
                    ...prevData,
                    title: text,
                  }))
                }
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Updated Description"
                value={updatedProductData.description}
                onChangeText={(text) =>
                  setUpdatedProductData((prevData) => ({
                    ...prevData,
                    description: text,
                  }))
                }
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Updated Category"
                value={updatedProductData.categoryName}
                onChangeText={(text) =>
                  setUpdatedProductData((prevData) => ({
                    ...prevData,
                    categoryName: text,
                  }))
                }
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Updated Image"
                value={updatedProductData.image}
                onChangeText={(text) =>
                  setUpdatedProductData((prevData) => ({
                    ...prevData,
                    image: text,
                  }))
                }
              />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleUpdatePress}
              >
                <Text style={styles.modalButtonText}>Update Product</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={closeUpdateModal}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  productContainer: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginRight: 16,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 14,
    color: "#888",
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
  },
  productBrand: {
    fontSize: 14,
    color: "red",
  },
  productColor: {
    fontSize: 14,
    color: "#888",
  },
  optionsButton: {
    padding: 8,
    borderRadius: 100,
  },

  optionsContainer: {
    position: "absolute",
    right: 10,
    width: 100,
    borderWidth: 1,
    borderColor: "#392e4a",
    top: 5,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ede7e1",
  },
  newProductButton: {
    position: "absolute",
    right: 16,
    top: 16,
    width: 120,
    height: 40,
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },

  newProductButtonText: {
    color: "#fff",
    fontSize: 15,
  },
  optionsContainer: {
    position: "absolute",
    right: 10,
    top: 5,
    width: 100,
    borderWidth: 1,
    borderColor: "#392e4a",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ede7e1",
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    width: "80%",
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProductList;
