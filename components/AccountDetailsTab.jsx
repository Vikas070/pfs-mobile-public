import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
// import { useFormikContext } from "formik";

const AccountDetailsTab = ({ values }) => {
  // const { values } = useFormikContext();

  return (
    <View style={styles.container}>
      {/* First Row: Account Balance, Service Cycle, and Meter Connection Location */}
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Account Balance*</Text>
          <TextInput
            style={styles.inputDisabled}
            value={values?.account_information?.account_balance}
            keyboardType="numeric"
            editable={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Service Cycle*</Text>
          <TextInput
            style={styles.inputDisabled}
            value={values?.service_point_information?.meter_read_cycle}
            editable={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Meter Connection Location*</Text>
          <TextInput
            style={styles.inputDisabled}
            value={values?.meter_information?.location}
            editable={false}
          />
        </View>
      </View>

      {/* Field Activity Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.label}>Field Activity Instructions*</Text>
        <TextInput
          style={styles.textArea}
          value={values.instructions}
          multiline
          numberOfLines={4}
          editable={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputContainer: {
    width: "30%",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  inputDisabled: {
    height: 40,
    backgroundColor: "#e5e5e5",
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#333",
  },
  instructionsContainer: {
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#e5e5e5",
    textAlignVertical: "top",
  },
});

export default AccountDetailsTab;
