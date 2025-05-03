import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Portal, Button } from "react-native-paper";

const CustomModal = ({
  visible,
  onClose,
  title,
  children,
  customHeader = null,
  handleSubmit,
}) => {
  return (
    <Portal>
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            {/* Header */}
            {customHeader ? (
              customHeader
            ) : (
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>

                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
            {/* Sub Header */}
            <View style={styles.subheader}>
              <Text style={styles.subtitle}>{title}</Text>
            </View>

            {/* Scrollable Content Area */}
            <View style={{ flex: 1 }}>{children}</View>

            {/* Footer Buttons */}
            <View style={styles.footer}>
              <Button
                mode="outlined"
                onPress={onClose}
                textColor="#000"
                style={{ marginRight: 10 }}
              >
                Close
              </Button>
              <Button
                mode="contained"
                onPress={handleSubmit}
                buttonColor="#ffc266"
                textColor="#000"
              >
                Submit
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingBottom: 20,
    elevation: 5,
    height: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  subheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#191e3b",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    padding: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    padding: 10,
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    fontSize: 20,
    color: "white",
    paddingHorizontal: 10,
  },
  content: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 25,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 20,
  },
});

export default CustomModal;
