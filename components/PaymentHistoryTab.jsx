import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const PaymentHistoryTab = ({ values }) => {
  const paymentData = values?.account_information?.payments ?? [];

  const recordsPerPage = 6;
  const totalRecords = paymentData.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      nestedScrollEnabled={true}
    >
      <View style={styles.container}>
        {/* Payment List */}
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Date Paid</Text>
          <Text style={styles.headerText}>Paid</Text>
        </View>
        {paymentData?.map((item, index) => (
          <View style={styles.row} key={index}>
            <TextInput
              style={styles.inputDisabled}
              value={item.date}
              editable={false}
            />
            <TextInput
              style={styles.inputDisabled}
              value={item.amount}
              editable={false}
            />
          </View>
        ))}
        {/* Pagination Controls */}
        <View style={styles.paginationContainer}>
          <Text style={styles.pageText}>
            Page {currentPage} - {recordsPerPage} of {totalRecords}
          </Text>
          <View style={styles.paginationButtons}>
            <TouchableOpacity
              onPress={goToPreviousPage}
              disabled={currentPage === 1}
            >
              <Text
                style={[
                  styles.paginationText,
                  currentPage === 1 && styles.disabledText,
                ]}
              >
                {"< Previous"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.currentPage}>{currentPage}</Text>

            <TouchableOpacity
              onPress={goToNextPage}
              disabled={currentPage === totalPages}
            >
              <Text
                style={[
                  styles.paginationText,
                  currentPage === totalPages && styles.disabledText,
                ]}
              >
                {"Next >"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 14,
    width: "45%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputDisabled: {
    width: "45%",
    height: 40,
    backgroundColor: "#e5e5e5",
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#333",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  pageText: {
    fontSize: 12,
    color: "#555",
  },
  paginationButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  paginationText: {
    marginHorizontal: 10,
    color: "#007bff",
    fontSize: 14,
  },
  currentPage: {
    fontSize: 14,
    fontWeight: "bold",
  },
  disabledText: {
    color: "#ccc",
  },
});

export default PaymentHistoryTab;
