import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const ReadDetailsTab = ({ values, setFieldValue }) => {
  const { meter_information } = values;
  const readt_histories = meter_information?.read_histories || {};
  // Local state for the input field
  const [dial1Value, setDial1Value] = useState(0);
  // Local state for the input field
  const [dial2Value, setDial2Value] = useState(0);

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={styles.label}></Text>
        <Text style={styles.headerText}>Date & Time</Text>
        <Text style={styles.headerText}>Dial 1</Text>
        <Text style={styles.headerText}>Dial 2</Text>
        <Text style={styles.headerText}>Consumption History</Text>
      </View>

      {/* Reads Prior Row */}
      <View style={styles.row}>
        <Text style={styles.label}>Reads Prior</Text>
        <TextInput
          style={styles.inputdisabled}
          value={readt_histories.read_date_time}
          placeholder="Date & Time"
          editable={false}
        />
        <TextInput
          style={styles.inputdisabled}
          value={readt_histories.last_read_dial1?.value}
          placeholder="Dial 1"
          editable={false}
        />
        <TextInput
          style={styles.inputdisabled}
          value={readt_histories.last_read_dial2?.value}
          placeholder="Dial 2"
          editable={false}
        />
        <TextInput
          style={styles.inputdisabled}
          value={readt_histories.history}
          placeholder="History"
          editable={false}
        />
      </View>

      {/* Current Reads Row */}
      <View style={styles.row}>
        <Text style={styles.label}>Current Reads</Text>
        <TextInput
          style={styles.inputdisabled}
          value={readt_histories.updated_read_date_time}
          onChange={(e) =>
            setFieldValue(
              "meter_information.read_histories.updated_read_date_time",
              e.nativeEvent.text
            )
          }
          editable={false}
          placeholder="Enter Date & Time"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={dial1Value}
          onChange={(e) => {
            setFieldValue(
              "meter_information.read_histories.updated_read_dial1.value",
              e.nativeEvent.text
            );
            setDial1Value(e.nativeEvent.text); // Update local state for dial1Value
          }}
          placeholder="Enter Dial 1"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={dial2Value}
          onChange={(e) => {
            setFieldValue(
              "meter_information.read_histories.updated_read_dial2.value",
              e.nativeEvent.text
            );
            setDial2Value(e.nativeEvent.text); // Update local state for dial2Value
          }}
          placeholder="Enter Dial 2"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginRight: 20,
    backgroundColor: "#f9f9f9",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
    width: "18%",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    width: "18%",
    fontWeight: "bold",
    fontSize: 14,
  },
  inputdisabled: {
    width: "20%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    textAlign: "center",
  },
  input: {
    width: "20%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    textAlign: "center",
  },
});

export default ReadDetailsTab;
