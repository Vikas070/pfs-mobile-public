import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { TabView, TabBar } from "react-native-tab-view";
import ReadDetailsTab from "./ReadDetails";
import MeterDetails from "./MeterDetailsTab";
import AccountDetailsTab from "./AccountDetailsTab";
import PaymentHistoryTab from "./PaymentHistoryTab";
import ServiceHistoryTab from "./ServiceHistoryTab";
import NotesTab from "./NotesTab";

const TabDetailsScreen = ({ values, setFieldValue }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "meter", title: "Meter Details" },
    { key: "read", title: "Read Details" },
    { key: "account", title: "Account Details" },
    { key: "service", title: "Service History" },
    { key: "payment", title: "Payment History" },
    { key: "notes", title: "Notes" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "meter":
        return <MeterDetails values={values} setFieldValue={setFieldValue} />;
      case "read":
        return <ReadDetailsTab values={values} setFieldValue={setFieldValue} />;
      case "account":
        return <AccountDetailsTab values={values} />;
      case "payment":
        return <PaymentHistoryTab values={values} />;
      case "service":
        return <ServiceHistoryTab values={values} />;
      case "notes":
        return <NotesTab values={values} />;
      default:
        return (
          <View style={styles.placeholder}>
            <Text>{route.title} Content</Text>
          </View>
        );
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      nestedScrollEnabled={true} // ✅ Allows scrolling inside modal
      showsVerticalScrollIndicator={true} // ✅ Enables Scroll Bar
      keyboardShouldPersistTaps="handled" // ✅ Handles taps outside of text fields
    >
      {/* Tab View with Fixed Height */}
      <View style={styles.tabContainer}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: "black" }}
              style={{ backgroundColor: "#f0f0f0" }}
              activeColor="black"
              inactiveColor="gray"
              scrollEnabled={true} // ✅ Allows horizontal scrolling of tabs if needed
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: 10,
    height: "100%", // ✅ Allows content to expand
  },
  scrollContent: {
    flexGrow: 1, // ✅ Ensures content expands and scrolls
    paddingBottom: 10, // Space for keyboard interaction
  },
  tabContainer: {
    height: 280, // ✅ Ensures tab content is visible
  },
  container: {
    padding: 15,
    backgroundColor: "#f8f8f8",
  },
  placeholder: {
    padding: 20,
    alignItems: "center",
  },
});

export default TabDetailsScreen;
