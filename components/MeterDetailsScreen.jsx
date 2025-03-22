import React, { useState } from "react";
import { View, TextInput, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { TabView, TabBar } from "react-native-tab-view";

const MeterDetailsScreen = () => {
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
        return <MeterDetails />;
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

const MeterDetails = () => {
  return (
    <View style={styles.table}>
      {/* Header Row */}
      <View style={styles.row}>
        <Text style={styles.headerCell}></Text>
        <Text style={styles.headerCell}>Conn</Text>
        <Text style={styles.headerCell}>Badge #</Text>
        <Text style={styles.headerCell}>Size</Text>
        <Text style={styles.headerCell}>Make</Text>
        <Text style={styles.headerCell}>Model</Text>
        <Text style={styles.headerCell}>Date</Text>
      </View>
      {/* Current Meter */}
      <View style={styles.row}>
        <Text style={styles.label}>Current Meter</Text>
        <TextInput style={styles.input} />
        <TextInput style={styles.input} value="45216970" editable={false} />
        <TextInput style={styles.input} value="07" editable={false} />
        <TextInput style={styles.input} value="BADGER" editable={false} />
        <TextInput style={styles.input} value="UNKNOWN" editable={false} />
        <TextInput style={styles.input} placeholder="Removed Date" />
      </View>
      {/* Installed Meter */}
      <View style={styles.row}>
        <Text style={styles.label}>Installed Meter</Text>
        <TextInput style={styles.input} />
        <TextInput style={styles.input} value="45216970" editable={false} />
        <TextInput style={styles.input} value="07" editable={false} />
        <TextInput style={styles.input} value="BADGER" editable={false} />
        <TextInput style={styles.input} value="UNKNOWN" editable={false} />
        <TextInput style={styles.input} placeholder="Installed Date" />
      </View>
      {/* MXU1 */}
      <View style={styles.row}>
        <Text style={styles.label}>MXU1</Text>
        <TextInput style={styles.inputFull} />
        <TextInput style={styles.input} value="MXU2" editable={false} />
      </View>
      {/* View All Link */}
      <Text style={styles.viewAll}>View All</Text>
    </View>
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
    paddingBottom: 20, // Space for keyboard interaction
  },
  tabContainer: {
    height: 250, // ✅ Ensures tab content is visible
  },
  container: {
    padding: 15,
    backgroundColor: "#f8f8f8",
  },
  table: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerCell: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    flex: 1.5,
  },
  input: {
    backgroundColor: "#e0e0e0",
    padding: 8,
    borderRadius: 5,
    flex: 1,
    textAlign: "center",
  },
  inputFull: {
    backgroundColor: "#e0e0e0",
    padding: 8,
    borderRadius: 5,
    flex: 2,
    textAlign: "center",
  },
  viewAll: {
    color: "blue",
    textAlign: "right",
    marginTop: 10,
  },
  placeholder: {
    padding: 20,
    alignItems: "center",
  },
});

export default MeterDetailsScreen;
