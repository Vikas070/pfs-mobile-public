import React from "react";
import { View, TextInput, StyleSheet, ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";
import MeterDetailsScreen from "./MeterDetailsScreen";

const FieldActivityScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Field Activity</Text>
        <Button mode="contained" style={styles.workOrderButton}>
          Directions to Work Order
        </Button>
        <View style={styles.orderContainer}>
          <Text style={styles.orderLabel}>MPET Order #</Text>
          <TextInput style={styles.input} value="1147595925" editable={false} />
        </View>
      </View>

      {/* Form Fields */}
      <View style={styles.form}>
        <View style={styles.row}>
          <View style={styles.field}>
            <Text style={styles.label}>Account Number</Text>
            <TextInput
              style={styles.input}
              value="1648700175"
              editable={false}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Field Activity ID</Text>
            <TextInput
              style={styles.input}
              value="1147595925"
              editable={false}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.fieldFull}>
            <Text style={styles.label}>Premise Address</Text>
            <TextInput
              style={styles.input}
              value="109 E WAIKO RD (1 OF 2 MTRS), Wailuku, HI, 96793"
              editable={false}
              multiline
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.fieldFull}>
            <Text style={styles.label}>Customer Address</Text>
            <TextInput
              style={styles.input}
              value="PO BOX 17908, Honolulu, HI, 96817"
              editable={false}
              multiline
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.field}>
            <Text style={styles.label}>Field Activity Type</Text>
            <TextInput style={styles.input} editable={false} />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Created</Text>
            <TextInput
              style={styles.input}
              value="12/01/2024"
              editable={false}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.field}>
            <Text style={styles.label}>Schedule/Appt</Text>
            <TextInput
              style={styles.input}
              value="August 25, 2023"
              editable={false}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Contact</Text>
            <TextInput
              style={styles.input}
              value="(808) 306-9918"
              editable={false}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.fieldFull}>
            <Text style={styles.label}>Issued By</Text>
            <TextInput style={styles.input} editable={false} />
          </View>
        </View>
      </View>
      <MeterDetailsScreen />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f8f8",
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  workOrderButton: {
    backgroundColor: "#4CAF50",
    marginHorizontal: 10,
  },
  orderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5,
  },
  form: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  field: {
    width: "48%",
  },
  fieldFull: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#e0e0e0",
    padding: 8,
    borderRadius: 5,
  },
});

export default FieldActivityScreen;
