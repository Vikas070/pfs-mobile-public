import React from "react";
import { View, StyleSheet } from "react-native";
import { useSession } from "@/utilities/ctx";
import { WebView } from "react-native-webview";

export default function MessageScreen() {
  const { user } = useSession();
  // const messagingUrl = `https://demo-messaging.prithibiconsulting.com/login?username=${
  //   typeof user === "object" && user?.user?.user_id
  // }`;
  const injectedJavascript = `
  if (typeof Notification === 'undefined') {
    global.Notification = {
      requestPermission: () => Promise.resolve('granted'), // Simulate permission
      // You can add more properties/methods as needed for your iframe's code
    };
  }
`;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        scalesPageToFit={true}
        bounces={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        thirdPartyCookiesEnabled={true}
        injectedJavaScript={injectedJavascript}
        // source={{
        //   html: `<iframe src=${messagingUrl} width="100%" height="100%" frameborder="0" />`,
        // }}
        source={{ uri: "https://blog.logrocket.com/" }}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#25292e",
    // justifyContent: "center",
    // alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  webview: {
    flex: 1,
  },
});
