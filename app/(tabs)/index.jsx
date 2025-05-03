import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { AdvancedCheckbox } from "react-native-advanced-checkbox";
import axios from "axios";
import { useSession } from "@/utilities/ctx";
import CustomModal from "@/components/customModal";
import { Provider as PaperProvider } from "react-native-paper";
import FieldActivityScreen from "@/components/direction";
import { Formik } from "formik";
import CustomModalHeader from "@/components/CustomModalHeader";
import FollowUpNoteModal from "@/components/FollowUpNoteModal";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import polyline from "@mapbox/polyline";
import { Google_Map_Api_Key } from "@/utilities/constant";
import OfflineMapNavigation from "@/components/OfflineMapNavigation";
import * as Location from "expo-location";
import { getDistance } from "geolib";

const GOOGLE_API_KEY = Google_Map_Api_Key;

const isNear = (coord1, coord2, threshold = 0.0004) => {
  return (
    Math.abs(coord1?.latitude - coord2?.latitude) < threshold &&
    Math.abs(coord1.longitude - coord2.longitude) < threshold
  );
};

export default function Index() {
  const { technician } = useSession();
  const [technicianData, setTechnicianData] = useState([]);
  const [data, setData] = useState({ workOrder: {}, visibleProp: false });
  const [refreshing, setRefreshing] = useState(false);
  const [showOfflineMap, setShowOfflineMap] = useState({
    workOrder: {},
    visibleProp: false,
    destination: {},
  });
  const technician_id =
    typeof technician === "object" && technician !== null
      ? technician.technician_id
      : undefined;

  const params = {
    draw: 0,
    length: 3,
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
      // technician_id: technician_id,
      // Uncomment the following line if you want to see the admin level data for testing and comment the above line
      technician_id: "",
    },
  };

  const [userLocation, setUserLocation] = useState(null);
  const startLocationTracking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Location permission is required for tracking."
      );
      return;
    }

    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 200000,
        distanceInterval: 1,
      },
      (location) => {
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });
      }
    );
  };

  useEffect(() => {
    startLocationTracking();
  }, []);

  const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/field-activity/list/${JSON.stringify(params)}`
      );
      const data = response.data.data ?? [];
      const getFilteredData = data.filter((item) => item.status != "Completed");
      setTechnicianData(getFilteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // if (technician_id) fetchData();

    // Uncomment the following line if you want to see the admin level data for testing and comment the above line
    fetchData();
  }, [technician_id]);

  const [initialValues, setInitialValues] = useState({});
  const [faData, setFaData] = useState(null);
  const [followUpModalVisible, setFollowUpModalVisible] = useState(false);
  const [checked, setChecked] = useState([]);
  const fetchFaData = async (faId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/field-activity/${faId}`
      );
      const data = response.data ?? {};
      setFaData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data?.faId) {
      fetchFaData(data?.faId);
    }
  }, [data.faId]);

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

  useEffect(() => {
    const meter_information_id =
      faData?.meter_information?.meter_information_id ?? "";
    const readt_history = faData?.meter_information?.read_histories ?? [];
    const read_dial1 = readt_history.filter((item) => item.dial === "dial1");
    const last_read_dial1 = read_dial1[read_dial1.length - 1];
    const read_dial2 = readt_history.filter((item) => item.dial === "dial2");
    const last_read_dial2 = read_dial2[read_dial2.length - 1];

    // Determine the latest read_date_time
    const latestReadDateTime = Math.max(
      last_read_dial1?.read_date_time
        ? Date.parse(last_read_dial1.read_date_time)
        : 0,
      last_read_dial2?.read_date_time
        ? Date.parse(last_read_dial2.read_date_time)
        : 0
    );

    const read_histories = {
      meter_information_id,
      read_date_time: formatDateTime(new Date(latestReadDateTime))
        ? formatDateTime(new Date(latestReadDateTime))
        : null,
      updated_read_date_time: formatDateTime(new Date()),
      last_read_dial1: last_read_dial1 ?? null,
      last_read_dial2: last_read_dial2 ?? null,
      updated_read_dial1: {
        read_date_time: formatDateTime(new Date()),
        value: 0,
        dial: "dial1",
      },
      updated_read_dial2: {
        read_date_time: formatDateTime(new Date()),
        value: 0,
        dial: "dial2",
      },
    };

    setInitialValues({
      ...faData,
      meter_information: {
        ...faData?.meter_information,
        read_histories,
      },
    });
  }, [faData]);

  const saveFormData = async (values) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/field-activity/${values.field_activity_id}`,
        values
      );
      if (response.status === 200) {
        Alert.alert("Success", "Data saved successfully.");
        setData({ workOrder: {}, visibleProp: false });
        fetchData();
      } else {
        Alert.alert("Error", "Failed to save data.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      Alert.alert("Error", "Failed to save data.");
    }
  };

  const handleFormSubmit = (values) => {
    // Perform your form submission logic here
    // For example, you can send the data to your server or API
    saveFormData(values);
    alert("Success, Form submitted successfully!");
  };

  const fetchRoute = () => {
    if (checked.length > 0) {
      const selectedData = technicianData.filter((item) =>
        checked.includes(item.field_activity_id)
      );

      selectedData.map(async (item) => {
        const destination = {
          latitude:
            item.service_point_information?.geographic_location?.latitude,
          longitude:
            item.service_point_information?.geographic_location?.longitude,
        };
        // const origin = userLocation; // Original user location
        const origin = { latitude: 20.6871582, longitude: -156.4368404 }; // Example: Nearby point

        if (!origin.latitude || !destination?.latitude) {
          Alert.alert(
            "Error",
            "Origin or destination coordinates are missing."
          );
          return;
        }

        // Check if the distance is too far
        const distance = getDistance(origin, destination); // Distance in meters
        const maxDistance = 50000; // Example: 50 km
        if (distance > maxDistance) {
          Alert.alert(
            "Error",
            `The distance between origin and destination is too far (${(
              distance / 1000
            ).toFixed(2)} km). for work order ${item.activity_id}`
          );
          return;
        }

        if (isNear(origin, destination)) {
          Alert.alert("Error", "Origin and destination are too close.");
          return;
        }
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin?.latitude},${origin.longitude}&destination=${destination?.latitude},${destination.longitude}&key=${GOOGLE_API_KEY}`;
        const response = await axios.get(url);
        const route = response.data.routes[0];
        const decoded = polyline
          .decode(route.overview_polyline.points)
          .map(([lat, lng]) => ({
            latitude: lat,
            longitude: lng,
          }));
        const steps = route.legs[0].steps.map((step, index) => ({
          id: index + 1,
          instruction: step.html_instructions.replace(/<[^>]+>/g, ""),
          distance: step.distance.text,
        }));
        AsyncStorage.setItem(
          `offline_route_coords_${item.field_activity_id}`,
          JSON.stringify(decoded)
        );
        AsyncStorage.setItem(
          `offline_instructions_${item.field_activity_id}`,
          JSON.stringify(steps)
        );
      });
      setChecked([]);
    } else {
      Alert.alert("Error", "Please select at least one work order.");
    }
  };

  const deleteSavedRoutes = async () => {
    checked.map(async (item) => {
      await AsyncStorage.removeItem(`offline_route_coords_${item}`);
      await AsyncStorage.removeItem(`offline_instructions_${item}`);
    });
    setChecked([]);
    Alert.alert("Routes deleted", "Offline routes have been deleted.");
  };
  const handleDeleteRoutes = () => {
    if (checked.length > 0) {
      Alert.alert(
        "Delete Routes",
        "Are you sure you want to delete the saved routes?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              deleteSavedRoutes();
            },
          },
        ]
      );
    } else {
      Alert.alert(
        "Error",
        "Please select at least one work order to delete saved offline routes."
      );
    }
  };
  const handleSaveRoutes = () => {
    Alert.alert(
      "Save Routes",
      "Are you sure you want to save the current routes?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            fetchRoute();
          },
        },
      ]
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Replace this with your refresh logic (e.g., fetching data)
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulate refresh completion
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Button
            title="Fetch & Save Route"
            onPress={() => handleSaveRoutes()}
            disabled={checked.length === 0}
          />
          <View style={{ marginRight: 5 }} />
          <Button
            title="Delete Saved Routes"
            onPress={() => handleDeleteRoutes()}
            color="#ff4d4d"
          />
        </View>
        {technicianData.length > 0 && (
          <ScrollableTable
            data={technicianData}
            setData={setData}
            setShowOfflineMap={setShowOfflineMap}
            checked={checked}
            setChecked={setChecked}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        )}

        <Formik
          initialValues={initialValues}
          // initialValues={faData}
          onSubmit={(values) => handleFormSubmit(values)}
          enableReinitialize
        >
          {({ values, setFieldValue, handleSubmit }) => {
            return (
              data.visibleProp &&
              faData && (
                <CustomModal
                  visible={data.visibleProp}
                  onClose={() => setData({ workOrder: {}, visibleProp: false })}
                  title="Work Order Details"
                  handleSubmit={handleSubmit}
                  customHeader={
                    <CustomModalHeader
                      title={"Work Order Details"}
                      status={values.status ?? "Not Started"}
                      setFollowUpModalVisible={setFollowUpModalVisible}
                      values={values}
                      setFieldValue={setFieldValue}
                      handleSubmit={handleFormSubmit}
                      visible={data.visibleProp}
                    />
                  }
                >
                  <FieldActivityScreen
                    values={values ?? {}}
                    setFieldValue={setFieldValue}
                  />
                </CustomModal>
              )
            );
          }}
        </Formik>
        <FollowUpNoteModal
          visible={followUpModalVisible}
          onClose={() => setFollowUpModalVisible(false)}
          fieldActivityId={data.faId}
          closeWorkOrder={() => setData({ workOrder: {}, visibleProp: false })}
        />
        <OfflineMapNavigation
          visible={showOfflineMap.visibleProp}
          onClose={() =>
            setShowOfflineMap({
              faId: "",
              visibleProp: false,
              origin: {},
              destination: {},
            })
          }
          // origin={userLocation} // Original user location
          origin={{ latitude: 20.6871582, longitude: -156.4368404 }} // Example: Nearby point
          destination={showOfflineMap.destination ?? {}}
          faId={showOfflineMap.faId ?? ""}
          routeCoords={[]}
          instructions={[]}
        />
      </View>
    </PaperProvider>
  );
}

const ScrollableTable = ({
  data = [],
  setData,
  setShowOfflineMap,
  checked,
  setChecked,
  onRefresh,
  refreshing,
}) => {
  return (
    <ScrollView
      style={styles.tableContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        {/* Table Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text
            style={([styles.cell, styles.headerCell], { width: 20 })}
          ></Text>
          <Text style={[styles.cell, styles.headerCell, { width: 100 }]}>
            Account ID
          </Text>
          <Text style={[styles.cell, styles.headerCell, { width: 100 }]}>
            Work Order ID
          </Text>
          <Text style={[styles.cell, styles.headerCell, { width: 100 }]}>
            Work Order Type
          </Text>
          <Text style={[styles.cell, styles.headerCell, { width: 100 }]}>
            Status
          </Text>
          <Text style={[styles.cell, styles.headerCell, { width: 80 }]}>
            Sync
          </Text>
          <Text style={[styles.cell, styles.headerCell, { width: 180 }]}>
            Scheduled Date/Time
          </Text>
          <Text style={[styles.cell, styles.headerCell, { width: 100 }]}>
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
              <Text style={(styles.cell, { width: 25 })}>
                <AdvancedCheckbox
                  onValueChange={() => {
                    if (checked.includes(row.field_activity_id)) {
                      setChecked(
                        checked.filter((item) => item !== row.field_activity_id)
                      );
                    } else {
                      setChecked([...checked, row.field_activity_id]);
                    }
                  }}
                  value={checked.includes(row.field_activity_id)}
                  checkedColor="#007AFF"
                  uncheckedColor="#ccc"
                  size={18}
                />
              </Text>
              <Text style={(styles.cell, { width: 100 })}>
                {row.account_information?.account_id}
              </Text>
              <Text style={(styles.cell, { width: 100 })}>
                {row.activity_id}
              </Text>
              <Text style={(styles.cell, { width: 100 })}>
                {row.fa_service_type?.type}
              </Text>
              <Text style={(styles.cell, { width: 100 })}>
                {row?.status ?? "Not Started"}
              </Text>
              <Text style={(styles.cell, { width: 80 })}>
                {row.sync_status ?? "Off"}
              </Text>
              <Text style={(styles.cell, { width: 180 })}>
                {row.schedule_date}
              </Text>
              <Text style={(styles.cell, { width: 100 })}>
                {row.assigned_fa?.assigned_fa_id}
              </Text>
              <Text style={(styles.cell, { width: 200 })}>
                {row.account_information?.premise_address}
              </Text>
              <Text
                style={{
                  ...styles.cell,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    setData({
                      faId: row.field_activity_id ?? "",
                      visibleProp: true,
                    })
                  }
                >
                  <Ionicons
                    name="eye-sharp"
                    color="#000000"
                    style={{ marginLeft: 10 }}
                    size={22}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={async () => {
                    const coords = await AsyncStorage.getItem(
                      `offline_route_coords_${row.field_activity_id}`
                    );

                    if (coords) {
                      setShowOfflineMap({
                        faId: row.field_activity_id ?? "",
                        visibleProp: true,
                        destination: {
                          latitude:
                            row.service_point_information?.geographic_location
                              ?.latitude,
                          longitude:
                            row.service_point_information?.geographic_location
                              ?.longitude,
                        },
                      });
                    } else {
                      Alert.alert(
                        "Error",
                        "No offline route found for this work order."
                      );
                    }
                  }}
                >
                  <Ionicons
                    name="location-sharp"
                    color="#000000"
                    style={{ marginLeft: 10 }}
                    size={22}
                  />
                </TouchableOpacity>
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
    alignItems: "center",
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
  panel: {
    width: "20%",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
});
