import React, { useState } from "react";
import { router } from "expo-router";
import {
  Button,
  Text,
  TextInput,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import axios from "axios";

import { useSession } from "@/utilities/ctx";

export default function SignIn() {
  const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const LOCALHOST =
        Platform.OS === "ios"
          ? "http://127.0.0.1:8000"
          : "http://192.168.29.74:8000";
      const API_BASE_URL = LOCALHOST + "/api/v1";
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: email,
        password: password,
      });

      signIn(response.data);
      router.replace("/");
    } catch (error) {
      alert((error as any).message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SafeAreaView id="sign-in">
        <View style={{ ...styles.container, ...styles.padding }}>
          <Image
            source={require("../assets/images/pfs-icon.png")}
            style={{
              width: 150,
              height: 120,
              justifyContent: "center",
              marginBottom: 30,
            }}
            resizeMode="contain"
          />
          <Text style={styles.title}>
            {"Welcome To\nPrithibi Field Service"}
          </Text>
          <View style={{ width: "100%" }}>
            <Text style={{ color: "#fff" }}>Email</Text>
            <TextInput
              autoComplete="email"
              value={email}
              onChangeText={(newText) => setEmail(newText)}
              style={styles.formInput}
              clearButtonMode="while-editing"
            />
            <Text style={{ color: "#fff" }}>Password</Text>
            <TextInput
              autoComplete="password"
              value={password}
              onChangeText={(newText) => setPassword(newText)}
              style={{ ...styles.formInput, marginBottom: 10 }}
              secureTextEntry
              clearButtonMode="while-editing"
            />
            <Button
              title="Login"
              disabled={!email || !password}
              onPress={handleLogin}
              color="#ffc266"
            />
          </View>
          <Text style={{ color: "#fff", textAlign: "center", marginTop: 50 }}>
            {`Prithibi Consulting & Development Services (PCDS) | PFS - v1.0 \n@ Copyright Reserved. | +1.206.375.7443 | info@prithibiconsulting.com`}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  padding: {
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
    backgroundColor: "#191e3b",
    color: "#000",
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#000",
  },
  title: {
    marginBottom: 20,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  formInput: {
    height: 50,
    padding: 10,
    width: "100%",
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#E8F0FE",
    color: "#000",
  },
});
