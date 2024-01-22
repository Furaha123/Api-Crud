import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImagePick from "./ImagePicker";

const AddProduct = () => {
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    price: "",
    categoryName: "",
  });

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleAddProduct = async () => {
    try {
      if (!formData.title || !formData.description || !formData.price) {
        console.error("Please fill out all required fields ");
        return;
      }

      const response = await fetch(
        "https://mobiledevelopapi.onrender.com/food/createfood",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        console.log("Product added successfully:", responseData);
      } else {
        console.error("Error adding product:", responseData.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  useEffect(() => {}, [formData]);

  return (
    <View>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.heading}>Add New Product</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="title"
            value={formData.title}
            onChangeText={(text) => handleInputChange("title", text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Description"
            value={formData.description}
            multiline
            onChangeText={(text) => handleInputChange("description", text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Price"
            value={formData.price}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange("price", text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Category"
            value={formData.categoryName}
            onChangeText={(text) => handleInputChange("categoryName", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Image url"
            value={formData.image}
            onChangeText={(text) => handleInputChange("image", text)}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAddProduct()}
          >
            <Text style={styles.buttonText}>Add Product</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    width: "100%",
    marginTop: 42,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  uploadButton: {
    backgroundColor: "#4a15ad",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  imagePreview: {
    width: 50,
    height: 50,
  },
});

export default AddProduct;
