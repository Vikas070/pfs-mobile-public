import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  View,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
// import { Link } from "expo-router";
import axios from "axios";
import { useSession } from "@/utilities/ctx";
import CustomModal from "@/components/customModal";
import { Provider as PaperProvider } from "react-native-paper";
import FieldActivityScreen from "@/components/direction";

export default function Index() {
  const { technician } = useSession() as {
    technician: { technician_id: string } | null;
  };
  const [technicianData, setTechnicianData] = useState([]);
  const [data, setData] = useState({ id: "", visibleProp: false });
  const id =
    typeof technician === "object" && technician !== null
      ? technician.technician_id
      : undefined;

  const params = {
    draw: 0,
    length: 10,
    search: "",
    colunm: "field_activity_id",
    dir: "desc",
    position: 1,
    filterData: {
      search_key: "",
      activity_id: "",
      appointment: "",
      customer_name: "",
      customer_account: "",
      technician_id: id,
    },
  };

  const LOCALHOST =
    Platform.OS === "ios"
      ? "http://127.0.0.1:8000"
      : "http://192.168.29.74:8000";
  const API_BASE_URL = LOCALHOST + "/api/v1";

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/field-activity/list/${JSON.stringify(params)}`
      );
      const data = response.data.data ?? [];
      const getFilteredData = data.filter(
        (item: { status: string }) => item.status != "Completed"
      );
      setTechnicianData(getFilteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.text}>Work Orders</Text>
        {/* <Link href="/message" style={styles.button}>
          Go to Message
        </Link> */}
        {technicianData.length > 0 && (
          <ScrollableTable data={technicianData} setData={setData} />
        )}
        <CustomModal
          visible={data.visibleProp}
          onClose={() => setData({ ...data, visibleProp: false })}
          title="Work Order Details"
        >
          <FieldActivityScreen />
        </CustomModal>
      </View>
    </PaperProvider>
  );
}

interface RowData {
  assigned_fa?: {
    technician_id?: string;
    assigned_fa_id?: string;
  };
  account_information?: {
    account_id?: string;
    premise_address?: string;
  };
  activity_id?: string;
  fa_service_type?: {
    type?: string;
  };
  status?: string;
  sync_status?: string;
  schedule_date?: string;
  customer_address?: string;
  directions?: string;
  field_activity_id?: string;
}

const ScrollableTable = ({
  data = [],
  setData,
}: {
  data: RowData[];
  setData: React.Dispatch<
    React.SetStateAction<{ id: string; visibleProp: boolean }>
  >;
}) => {
  return (
    <ScrollView horizontal style={styles.tableContainer}>
      <View>
        {/* Table Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerCell]}>Account ID</Text>
          <Text style={[styles.cell, styles.headerCell]}>Work Order ID</Text>
          <Text style={[styles.cell, styles.headerCell]}>Work Order Type</Text>
          <Text style={[styles.cell, styles.headerCell]}>Status</Text>
          <Text style={[styles.cell, styles.headerCell]}>Sync</Text>
          <Text style={[styles.cell, styles.headerCell, { width: 200 }]}>
            Scheduled Date/Time
          </Text>
          <Text style={[styles.cell, styles.headerCell]}>
            Work Order Sequence
          </Text>
          <Text style={[styles.cell, styles.headerCell, { width: 200 }]}>
            Address
          </Text>
          <Text style={[styles.cell, styles.headerCell]}>Directions</Text>
        </View>
        {/* Table Rows */}
        {data.length > 0 ? (
          data?.map((row, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>
                {row.account_information?.account_id}
              </Text>
              <Text style={styles.cell}>{row.activity_id}</Text>
              <Text style={styles.cell}>{row.fa_service_type?.type}</Text>
              <Text style={styles.cell}>{row?.status ?? "Not Started"}</Text>
              <Text style={styles.cell}>{row.sync_status ?? "Off"}</Text>
              <Text style={(styles.cell, { width: 200 })}>
                {row.schedule_date}
              </Text>
              <Text style={styles.cell}>{row.assigned_fa?.assigned_fa_id}</Text>
              <Text style={(styles.cell, { width: 200 })}>
                {row.account_information?.premise_address}
              </Text>
              <Text style={styles.cell}>
                <Button
                  title="View"
                  onPress={() =>
                    setData({
                      id: row.field_activity_id ?? "",
                      visibleProp: true,
                    })
                  }
                  color="#ffc266"
                />
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.row}>
            <Text style={(styles.cell, { textAlign: "center" })}>
              No work order found
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#ffc266",
  },
  tableContainer: {
    marginVertical: 4,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#eee",
    padding: 10,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  headerRow: {
    backgroundColor: "#f1f2f4",
  },
  cell: {
    width: 100,
    textAlign: "left",
    fontSize: 16,
    padding: 5,
  },
  headerCell: {
    color: "#7d8fa9",
    fontWeight: "bold",
    textAlign: "left",
  },
});
