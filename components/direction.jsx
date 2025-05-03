import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
  Linking,
} from "react-native";
import { Button, Text } from "react-native-paper";
import TabDetailsScreen from "./TabDetailsScreen";

const FieldActivityScreen = ({ values, setFieldValue }) => {
  const { latitude, longitude } =
    values?.service_point_information?.geographic_location || {};
  const openPreferredMap = async (latitude, longitude) => {
    if (Platform.OS === "ios") {
      const url = `maps://?q=${latitude},${longitude}`;
      Linking.openURL(url);
    } else {
      const googleMapsURL = `comgooglemaps://?center=${latitude},${longitude}&zoom=14`;

      const isAvailable = await Linking.canOpenURL(googleMapsURL);
      if (isAvailable) {
        Linking.openURL(googleMapsURL);
      } else {
        Linking.openURL(
          `https://www.google.com/maps?q=${latitude},${longitude}`
        );
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Field Activity</Text>
        <Button
          mode="contained"
          textColor="#fff"
          style={styles.workOrderButton}
          onPress={() => {
            openPreferredMap(latitude, longitude);
          }}
          icon="map-marker"
        >
          Directions to Work Order
        </Button>
        <View style={styles.orderContainer}>
          <Text style={styles.orderLabel}>MPET Order #</Text>
          <TextInput
            style={styles.input}
            value={values?.activity_id}
            editable={false}
          />
        </View>
      </View>

      {/* Form Fields */}
      <View style={styles.form}>
        <View style={styles.row}>
          <View style={styles.field}>
            <Text style={styles.label}>Account Number</Text>
            <TextInput
              style={styles.input}
              value={values?.account_information?.account_id}
              editable={false}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Field Activity ID</Text>
            <TextInput
              style={styles.input}
              value={values?.activity_id}
              editable={false}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.fieldFull}>
            <Text style={styles.label}>Premise Address</Text>
            <TextInput
              style={styles.input}
              value={values?.account_information?.premise_address}
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
              value={values?.account_information?.mailing_address}
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
              value={values?.created_at}
              editable={false}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.field}>
            <Text style={styles.label}>Schedule/Appt</Text>
            <TextInput
              style={styles.input}
              value={values?.creation_date_time}
              editable={false}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Contact</Text>
            <TextInput
              style={styles.input}
              value={values?.account_information?.phone_number}
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
      <TabDetailsScreen values={values} setFieldValue={setFieldValue} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 10,
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
    color: "#333",
  },
  workOrderButton: {
    backgroundColor: "#4CAF50",
    marginHorizontal: 10,
  },
  orderContainer: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  orderLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5,
    color: "#333",
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
    color: "black",
  },
  input: {
    backgroundColor: "#e0e0e0",
    padding: 8,
    borderRadius: 5,
    minWidth: "20%",
  },
});

export default FieldActivityScreen;
