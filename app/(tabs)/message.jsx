import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function UserScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Message Screen</Text>
      <Text style={styles.text}>Comming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
