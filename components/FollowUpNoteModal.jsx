import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useSession } from "@/utilities/ctx";

const FollowUpNoteModal = ({
  visible,
  onClose,
  fieldActivityId,
  closeWorkOrder,
}) => {
  const [followUpCode, setFollowUpCode] = useState(null);
  const [note, setNote] = useState("");
  const { technician } = useSession();

  const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

  const postFollowUpNotes = async (data) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/follow-up-notes`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Follow-up notes submitted successfully:", response.data);
        onClose(); // Close the modal after submission
        closeWorkOrder(); // Call the function to close the work order
      } else {
        console.error("Error submitting follow-up notes:", response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    const data = {
      field_activity_id: fieldActivityId,
      technician_remark: technician.name,
      work_order_code: followUpCode,
      note: note,
      created_by: technician.user_id,
      follow_up_note_id: "",
    };

    await postFollowUpNotes(data);
    // onSubmit(data);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <AntDesign name="profile" size={20} color="#fff" />
            <Text style={styles.headerText}>WO Follow-up Note</Text>
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="close" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Technician Remarks</Text>
            <TextInput
              style={styles.technicianRemark}
              value={technician?.name ?? ""}
              editable={false}
            />

            <Text style={styles.label}>Follow up Work Order Code</Text>
            <RNPickerSelect
              onValueChange={setFollowUpCode}
              items={[
                { label: "WO12345", value: "WO12345" },
                { label: "WO67890", value: "WO67890" },
              ]}
              placeholder={{ label: "Select Code", value: null }}
              style={pickerStyles}
            />

            <Text style={styles.label}>Note</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Enter note here..."
              multiline
              numberOfLines={4}
              value={note}
              onChangeText={setNote}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FollowUpNoteModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "50%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#1c274c",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  form: {
    padding: 15,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
  },
  textArea: {
    height: 80,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    paddingTop: 0,
  },
  closeBtn: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#1c274c",
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
  },
  closeText: {
    color: "#1c274c",
    fontWeight: "600",
  },
  submitBtn: {
    flex: 1,
    backgroundColor: "#fdbb5c",
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
  },
  submitText: {
    color: "#000",
    fontWeight: "600",
  },
});

const pickerStyles = {
  inputIOS: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 5,
    color: "#333",
    marginBottom: 5,
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 5,
    color: "#333",
    marginBottom: 5,
  },
  technicianRemark: {
    width: "100%",
    marginTop: 6,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#f5f5f5",
  },
};
