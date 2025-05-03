import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";

const CustomHeader = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("../assets/images/pfs-icon.png")} // Replace with your logo path
        style={styles.logo}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    paddingLeft: 30,
    backgroundColor: "#25292e",
    // height: 220, // Adjust as needed
  },
  logo: {
    width: 50, // Adjust as needed
    height: 50, // Adjust as needed
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
});

export default CustomHeader;
