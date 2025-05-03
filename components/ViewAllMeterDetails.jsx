import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";

const ViewAllMeterDetails = ({ visible, onClose }) => {
  const [currentMeter, setCurrentMeter] = useState({
    conn: "",
    badge: "1822543",
    size: "07",
    make: "BADGER",
    model: "UNKOWN",
    type: "HYD",
    hands: "5/3",
    found: false,
    left: false,
    dial1: "1727",
    dial2: "",
  });

  const [installedMeter, setInstalledMeter] = useState({
    conn: "",
    badge: "",
    size: "",
    make: "",
    model: "",
    type: "",
    hands: "",
    found: false,
    left: false,
    dial1: "",
    dial2: "",
  });

  const [mxu1, setMxu1] = useState("");

  const handleSubmit = () => {
    console.log({ currentMeter, installedMeter, mxu1 });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Meter Details</Text>

          <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
            <View>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <Text style={styles.blankCell}></Text>
                <Text style={styles.headerCell}>Conn</Text>
                <Text style={styles.headerCell}>Badge #</Text>
                <Text style={styles.headerCell}>Size</Text>
                <Text style={styles.headerCell}>Make</Text>
                <Text style={styles.headerCell}>Model</Text>
                <Text style={styles.headerCell}>Type</Text>
                <Text style={styles.headerCell}>Hands</Text>
                <Text style={styles.headerCell}>Found</Text>
                <Text style={styles.headerCell}>Left</Text>
                <Text style={styles.headerCell}>Dial 1</Text>
                <Text style={styles.headerCell}>Dial 2</Text>
              </View>

              {/* Current Meter Row */}
              <View style={styles.tableRow}>
                <Text style={styles.rowLabel}>Current Meter</Text>
                <TextInput
                  style={styles.inputCell}
                  value={currentMeter.conn}
                  onChangeText={(text) =>
                    setCurrentMeter({ ...currentMeter, conn: text })
                  }
                  placeholder="Conn"
                />
                <TextInput
                  style={styles.inputCell}
                  value={currentMeter.badge}
                  onChangeText={(text) =>
                    setCurrentMeter({ ...currentMeter, badge: text })
                  }
                />
                <TextInput
                  style={styles.inputCell}
                  value={currentMeter.size}
                  onChangeText={(text) =>
                    setCurrentMeter({ ...currentMeter, size: text })
                  }
                />
                <TextInput
                  style={styles.inputCell}
                  value={currentMeter.make}
                  onChangeText={(text) =>
                    setCurrentMeter({ ...currentMeter, make: text })
                  }
                />
                <TextInput
                  style={styles.inputCell}
                  value={currentMeter.model}
                  onChangeText={(text) =>
                    setCurrentMeter({ ...currentMeter, model: text })
                  }
                />
                <TextInput
                  style={styles.inputCell}
                  value={currentMeter.type}
                  onChangeText={(text) =>
                    setCurrentMeter({ ...currentMeter, type: text })
                  }
                />
                <TextInput
                  style={styles.inputCell}
                  value={currentMeter.hands}
                  onChangeText={(text) =>
                    setCurrentMeter({ ...currentMeter, hands: text })
                  }
                />
                <Switch
                  value={currentMeter.found}
                  onValueChange={(val) =>
                    setCurrentMeter({ ...currentMeter, found: val })
                  }
                  style={styles.smallSwitch}
                />
                <Switch
                  value={currentMeter.left}
                  onValueChange={(val) =>
                    setCurrentMeter({ ...currentMeter, left: val })
                  }
                  style={styles.smallSwitch}
                />
                <TextInput
                  style={styles.inputCell}
                  value={currentMeter.dial1}
                  onChangeText={(text) =>
                    setCurrentMeter({ ...currentMeter, dial1: text })
                  }
                />
                <TextInput
                  style={styles.inputCell}
                  value={currentMeter.dial2}
                  onChangeText={(text) =>
                    setCurrentMeter({ ...currentMeter, dial2: text })
                  }
                />
              </View>

              {/* Installed Meter Row */}
              <View style={styles.tableRow}>
                <Text style={styles.rowLabel}>Installed Meter</Text>
                <TextInput
                  style={styles.inputCell}
                  value={installedMeter.conn}
                  onChangeText={(text) =>
                    setInstalledMeter({ ...installedMeter, conn: text })
                  }
                />
                <TextInput
                  style={styles.inputCell}
                  value={installedMeter.badge}
                  onChangeText={(text) =>
                    setInstalledMeter({ ...installedMeter, badge: text })
                  }
                />
                <TextInput
                  style={styles.inputCell}
                  value={installedMeter.size}
                  onChangeText={(text) =>
                    setInstalledMeter({ ...installedMeter, size: text })
                  }
                />
                <TextInput
                  style={styles.inputCell}
                  value={installedMeter.make}
                  onChangeText={(text) =>
                    setInstalledMeter({ ...installedMeter, make: text })
                  }
                />
                <TextInput
                  style={styles.inputCell}
                  value={installedMeter.model}
                  onChangeText={(text) =>
                    setInstalledMeter({ ...installedMeter, model: text })
                  }
                />
                <TextInput
                  style={styles.inputCell}
                  value={installedMeter.type}
                  onChangeText={(text) =>
                    setInstalledMeter({ ...installedMeter, type: text })
                  }
                />
                <TextInput
                  style={styles.inputCell}
                  value={installedMeter.hands}
                  onChangeText={(text) =>
                    setInstalledMeter({ ...installedMeter, hands: text })
                  }
                />
                <Switch
                  value={installedMeter.found}
                  onValueChange={(val) =>
                    setInstalledMeter({ ...installedMeter, found: val })
                  }
                  style={styles.smallSwitch}
                />
                <Switch
                  value={installedMeter.left}
                  onValueChange={(val) =>
                    setInstalledMeter({ ...installedMeter, left: val })
                  }
                  style={styles.smallSwitch}
                />
                <TextInput
                  style={styles.inputCell}
                  value={installedMeter.dial1}
                  onChangeText={(text) =>
                    setInstalledMeter({ ...installedMeter, dial1: text })
                  }
                />
                <TextInput
                  style={styles.inputCell}
                  value={installedMeter.dial2}
                  onChangeText={(text) =>
                    setInstalledMeter({ ...installedMeter, dial2: text })
                  }
                />
              </View>

              {/* MXU1 Input */}
              <View style={styles.mxuRow}>
                <Text style={styles.rowLabel}>MXU1</Text>
                <TextInput
                  style={styles.mxuInput}
                  placeholder="Enter MXU1"
                  value={mxu1}
                  onChangeText={setMxu1}
                />
              </View>
            </View>
          </ScrollView>

          {/* Bottom Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ViewAllMeterDetails;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "95%",
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  scrollContainer: {
    flexDirection: "column",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  blankCell: {
    width: 100,
    marginRight: 8,
  },
  headerCell: {
    width: 80,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12,
    paddingHorizontal: 5,
    marginRight: 5,
    marginVertical: 3,
  },
  rowLabel: {
    width: 100,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "right",
    marginRight: 8,
  },
  inputCell: {
    width: 80,
    height: 36,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 5,
    fontSize: 12,
    backgroundColor: "#fff",
    marginRight: 5,
    marginVertical: 3,
    textAlign: "center",
  },
  smallSwitch: {
    width: 70,
    marginRight: 15,
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },
  mxuRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  mxuInput: {
    flex: 1,
    height: 36,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 14,
    // marginLeft: 10,
    backgroundColor: "#fff",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
    width: "98%",
  },
  cancelButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#f8b400",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "bold",
  },
});
