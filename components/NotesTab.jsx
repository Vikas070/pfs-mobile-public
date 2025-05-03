import React, { useState } from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";

// Notes Component
const NotesTab = ({ values }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const { follow_up_notes } = values;
  // Paginate the data
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords =
    follow_up_notes?.slice(indexOfFirstRecord, indexOfLastRecord) ?? [];

  const totalPages = Math.ceil(follow_up_notes?.length / recordsPerPage);

  // Handle Pagination
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      nestedScrollEnabled={true}
    >
      <View
        style={{
          flex: 1,
          padding: 16,
        }}
      >
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>ID</Text>
          <Text style={styles.headerText}>Work Order tab</Text>
          <Text style={styles.headerText}>Technical Remark</Text>
          <Text style={styles.headerText}>Note</Text>
        </View>
        {currentRecords.map((item, index) => {
          return (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.rowText}>{item.follow_up_note_id}</Text>
              <Text style={styles.rowText}>{item.work_order_code}</Text>
              <Text style={styles.rowText}>{item.technician_remark}</Text>
              <Text style={styles.rowText}>{item.note}</Text>
            </View>
          );
        })}

        {/* Pagination Controls */}
        <View style={styles.paginationContainer}>
          <Button
            title="Previous"
            onPress={handlePrevious}
            disabled={currentPage === 1}
          />
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            title="Next"
            onPress={handleNext}
            disabled={currentPage === totalPages}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerText: {
    width: 100,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  rowText: {
    width: 100,
    textAlign: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
    alignItems: "center",
  },
});

export default NotesTab;
