import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  // Button,
} from "react-native";
import DatePicker from "expo-datepicker";
import { Button } from "react-native-paper";
import ViewAllMeterDetails from "./ViewAllMeterDetails";

// For pretty date formatting
const formatDate = (date) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-US");
};
const MeterDetailsTab = ({ values, setFieldValue }) => {
  const [mxu, setMxU] = useState({ value: "MXU2" });
  const [date, setDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMeterModalVisible, setIsMeterModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleDateChange = (newDateStr) => {
    if (newDateStr) {
      const normalizedDate = newDateStr.replace(/\//g, "-");
      const parsed = new Date(normalizedDate);
      console.log("Selected date:", parsed, new Date(normalizedDate));
      if (!isNaN(parsed)) {
        setDate(parsed);
      } else {
        console.warn("Invalid date format:", newDateStr);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}></Text>
        <Text style={styles.headerText}>Conn</Text>
        <Text style={styles.headerText}>Badge #</Text>
        <Text style={styles.headerText}>Size</Text>
        <Text style={styles.headerText}>Make</Text>
        <Text style={styles.headerText}>Model</Text>
        <Text style={styles.headerText}>Date</Text>
      </View>

      {/* Current Meter Row */}
      <View style={styles.row}>
        <Text style={styles.label}>Current Meter</Text>
        <TextInput style={styles.input} placeholder="Conn" />
        <TextInput
          style={styles.inputDisabled}
          value={values.meter_information?.badge_number}
          editable={false}
        />
        <TextInput
          style={styles.inputDisabled}
          value={values.meter_information?.size}
          editable={false}
        />
        <TextInput
          style={styles.inputDisabled}
          value={values.meter_information?.type}
          editable={false}
        />
        <TextInput
          style={styles.inputDisabled}
          value={values.meter_information?.model}
          editable={false}
        />
        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateText}>
            {formatDate(new Date(values.meter_information?.updated_at))}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Installed Meter Row */}
      <View style={styles.row}>
        <Text style={styles.label}>Installed Meter</Text>
        <TextInput
          style={styles.input}
          placeholder="Conn"
          // onChange={(e) =>
          //   setFieldValue("meter_information.conn", e.nativeEvent.text)
          // }
        />
        <TextInput
          style={styles.input}
          value={values.meter_information?.badge_number}
          onChange={(e) =>
            setFieldValue("meter_information.badge_number", e.nativeEvent.text)
          }
        />
        <TextInput
          style={styles.input}
          value={values.meter_information?.size}
          onChange={(e) =>
            setFieldValue("meter_information.size", e.nativeEvent.text)
          }
        />
        <TextInput
          style={styles.input}
          value={values.meter_information?.type}
        />
        <TextInput
          style={styles.input}
          value={values.meter_information?.model}
          onChange={(e) =>
            setFieldValue("meter_information.model", e.nativeEvent.text)
          }
        />
        <TouchableOpacity style={styles.dateButton} onPress={openModal}>
          <Text style={styles.dateText}>
            {/* {values.meter_information.updated_at} */}
            {formatDate(date)}
          </Text>
        </TouchableOpacity>
      </View>

      {/* MXU Row */}
      <View style={styles.row}>
        <Text style={styles.label}>MXU1</Text>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Enter MXU"
        />
        <TextInput
          style={styles.inputDisabled}
          value={mxu.value}
          editable={false}
        />
      </View>

      {/* View All Link */}
      <TouchableOpacity
        style={styles.viewAll}
        onPress={() => setIsMeterModalVisible(true)}
      >
        <Text style={styles.viewAllText}>View All</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <DatePicker
              date={date ? date.toISOString().split("T")[0] : ""} // Pass string!
              onChange={handleDateChange}
              mode="date"
            />
            <View style={styles.row}>
              <Button
                mode="outlined"
                onPress={closeModal}
                textColor="#000"
                style={{ marginRight: 10 }}
              >
                Close
              </Button>
              <Button
                mode="contained"
                onPress={closeModal}
                buttonColor="#ffc266"
                textColor="#000"
              >
                Ok
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <ViewAllMeterDetails
        visible={isMeterModalVisible}
        onClose={() => setIsMeterModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
    width: "13%",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    width: "15%",
    fontWeight: "bold",
    fontSize: 14,
  },
  input: {
    width: "13%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  inputDisabled: {
    width: "13%",
    height: 40,
    backgroundColor: "#e5e5e5",
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: "center",
    marginHorizontal: 5,
  },
  dateButton: {
    width: "13%",
    height: 40,
    backgroundColor: "#e5e5e5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  dateText: {
    color: "#333",
    fontSize: 12,
  },
  cameraIcon: {
    marginTop: 20,
    alignItems: "flex-start",
  },
  icon: {
    width: 30,
    height: 30,
  },
  viewAll: {
    marginTop: 10,
    marginRight: 10,
    alignSelf: "flex-end",
  },
  viewAllText: {
    color: "#1e40af",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    // width: "50%", // ✅ this makes it 50% of the screen
    // backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    // backgroundColor: "rgba(199, 189, 189, 0.5)",
    backgroundColor: "rgba(255, 255, 255, 0.88)",
    padding: 20,
    borderRadius: 12,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default MeterDetailsTab;
