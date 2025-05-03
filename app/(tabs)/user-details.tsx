import { useSession } from "../../utilities/ctx";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function UserScreen() {
  const { signOut } = useSession();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>User screen</Text>
      <Text
        style={styles.text}
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        Sign Out
      </Text>
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
