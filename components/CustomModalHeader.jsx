import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { WORK_ORDER_STATUS } from "../../utilities/constant";

let timeoutId;
const CustomModalHeader = ({
  title,
  status,
  setFollowUpModalVisible,
  values,
  setFieldValue,
  handleSubmit,
  visible,
}) => {
  const [selectedValue, setSelectedValue] = useState();
  const [dropdownOptions, setDropdownOptions] = useState(WORK_ORDER_STATUS);

  const formatDateTime = (date) => {
    const pad = (num) => (num < 10 ? `0${num}` : num); // Helper to pad single digits
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months are 0-based
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSelectValue = (value) => {
    console.log("Selected value:", value);
    setSelectedValue(value);
    setFieldValue("status", value);

    const updatedValues = {
      ...values,
      status: value,
      started_time: value === "In Progress" ? formatDateTime(new Date()) : null, // Set the current date and time
      paused_time: value === "Paused" ? formatDateTime(new Date()) : null, // Reset paused time
      completed_time: value === "Completed" ? formatDateTime(new Date()) : null, // Reset completed time
      resume_time: null, // Reset resume time
    };

    clearTimeout(timeoutId); // Clear the timeout if it exists

    timeoutId = setTimeout(() => {
      handleSubmit(updatedValues); // Call the function after 0.5 second
    }, 500); // 500 milliseconds = 0.5 second
  };

  // Cleanup function to clear the timeout when the component unmounts or re-renders
  useEffect(() => {
    if (!visible) setSelectedValue(null);
  }, [visible]);

  useEffect(() => {
    setSelectedValue(status);
    if (status === "In Progress") {
      const updatedOptions = WORK_ORDER_STATUS.filter(
        (option) =>
          option.label !== "Resume Work Order" && option.value !== "Enroute"
      );
      setDropdownOptions(updatedOptions);
    }
    if (status === "Paused") {
      const updatedOptions = WORK_ORDER_STATUS.filter(
        (option) => option.label !== "Start Work Order"
      );
      setDropdownOptions(updatedOptions);
    }
    if (status === "Cancelled") {
      const updatedOptions = WORK_ORDER_STATUS.filter(
        (option) =>
          option.label !== "Start Work Order" && option.value !== "Paused"
      );
      setDropdownOptions(updatedOptions);
    }
  }, [status]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <RNPickerSelect
          placeholder={{}}
          items={dropdownOptions}
          onValueChange={(value) => {
            if (selectedValue && value !== selectedValue) {
              handleSelectValue(value); // Only call if the value has changed
            }
          }}
          value={selectedValue}
          style={pickerSelectStyles}
        />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "20%",
        }}
      >
        <Text>Status</Text>
        <TextInput
          style={styles.statusField}
          value={selectedValue}
          editable={false}
          placeholder="Status"
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          marginLeft: 12,
        }}
      >
        <TouchableOpacity onPress={() => setFollowUpModalVisible(true)}>
          <Text>
            <FontAwesome name="plus-circle" size={20} color="black" /> Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dropdownToggle: {
    marginLeft: 8,
  },
  dropdown: {
    // direction: "column",
    width: "20%",
    marginTop: 8,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  dropdownItem: {
    alignItems: "center",
    padding: 8,
  },
  dropdownText: {
    fontSize: 16,
  },
  statusField: {
    width: "80%",
    // marginTop: 6,
    marginLeft: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#f5f5f5",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    height: 40,
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    height: 40,
    paddingRight: 30,
  },
});

export default CustomModalHeader;
