import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
// import SQLite from "react-native-sqlite-storage";
// const db = SQLite.openDatabase(
//   {
//     name: "MainDB",
//     location: "default",
//   },
//   () => {},
//   (error) => {
//     console.log(error);
//   }
// );
const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // useEffect(() => {
  //   createTable();
  // });
  // const createTable = () => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "CREATE TABLE IF NOT EXISTS Users (ID INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, confirmPassword TEXT);",
  //       [],
  //       (tx, results) => {
  //         console.log("Created user table successfully");
  //       },
  //       (error) => {
  //         console.error("Error creating Users table:", error);
  //       }
  //     );
  //   });
  // };
  // const setData = () => {
  //   if (
  //     username &&
  //     password &&
  //     confirmPassword &&
  //     password === confirmPassword
  //   ) {
  //     db.transaction((tx) => {
  //       tx.executeSql(
  //         "INSERT INTO Users (username, password, confirmPassword) VALUES (?, ?, ?)",
  //         [username, password, confirmPassword],
  //         (tx, results) => {
  //           if (results.rowsAffected > 0) {
  //             console.log("User data inserted successfully");
  //           } else {
  //             console.error("Failed to insert user data");
  //           }
  //         },
  //         (error) => {
  //           console.error("Error inserting user data:", error);
  //         }
  //       );
  //     });
  //   }
  // };

  const handleSignUp = () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // Your sign-up logic goes here...

    navigation.navigate("Login");
  };
  return (
    <ImageBackground
      source={require("../screens/pages/images/welcome.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          Welcome to the <Text style={styles.highlight}>eShop Services</Text>
        </Text>
        <Text style={styles.label}>Username:</Text>

        <TextInput
          style={styles.input}
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="Username"
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          placeholder="atleast 6 characters"
        />

        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.underlinedText}>
            Already have an account? <Text style={styles.loginText}>Login</Text>
          </Text>
        </TouchableOpacity>

        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  label: {
    marginBottom: 7,
    color: "#000",
    fontSize: 23,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginVertical: 20,
  },
  highlight: {
    color: "#038aff",
  },
  underlinedText: {
    fontSize: 18,
    color: "#000",
    // marginTop: 5,
    marginBottom: 15,
  },
  loginText: {
    textDecorationLine: "underline",
    color: "#038aff",
  },
});

export default SignUpScreen;
