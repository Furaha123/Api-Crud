import React from "react";
import { StyleSheet, Text, View } from "react-native";
function header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Dashboard App</Text>
    </View>
  );
}

export default header;

const styles = StyleSheet.create({
  header: {
    marginTop:22,
    height: 80,
    paddingTop: 29,
    backgroundColor: "coral",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
