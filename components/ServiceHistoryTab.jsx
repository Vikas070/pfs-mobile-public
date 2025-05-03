import React, { useState } from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";

const serviceHistory = [
  {
    date: "08/29/2022",
    type: "High",
    high: "50",
    low: "30",
    main: "80",
    total: "160",
  },
  {
    date: "08/01/2022",
    type: "Low",
    high: "40",
    low: "25",
    main: "65",
    total: "130",
  },
  {
    date: "06/28/2022",
    type: "Main",
    high: "35",
    low: "20",
    main: "55",
    total: "110",
  },
  {
    date: "05/30/2022",
    type: "High",
    high: "60",
    low: "45",
    main: "105",
    total: "210",
  },
  {
    date: "04/28/2022",
    type: "Low",
    high: "33",
    low: "15",
    main: "48",
    total: "96",
  },
  {
    date: "03/28/2022",
    type: "Main",
    high: "45",
    low: "20",
    main: "65",
    total: "130",
  },
];
// Service History Component
const ServiceHistoryTab = ({ values }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  // Paginate the data
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = serviceHistory.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(serviceHistory.length / recordsPerPage);

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
          <Text style={styles.headerText}>Mtr Rd Date</Text>
          <Text style={styles.headerText}>Mtr Rd Type</Text>
          <Text style={styles.headerText}>High</Text>
          <Text style={styles.headerText}>Low</Text>
          <Text style={styles.headerText}>Main</Text>
          <Text style={styles.headerText}>Total</Text>
        </View>
        {currentRecords.map((item, index) => {
          return (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.rowText}>{item.date}</Text>
              <Text style={styles.rowText}>{item.type}</Text>
              <Text style={styles.rowText}>{item.high}</Text>
              <Text style={styles.rowText}>{item.low}</Text>
              <Text style={styles.rowText}>{item.main}</Text>
              <Text style={styles.rowText}>{item.total}</Text>
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

export default ServiceHistoryTab;
