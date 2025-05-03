import React, { useState, useRef, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import MapView, { Marker, Polyline } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

const OfflineMapNavigation = ({
  visible,
  onClose,
  origin,
  destination,
  faId,
}) => {
  const [routeCoords, setRouteCoords] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [offRoute, setOffRoute] = useState(false);
  const watchId = useRef(null);

  useEffect(() => {
    loadOfflineRoute();
    startLocationTracking();

    return () => {
      if (watchId.current) {
        Location.stopLocationUpdatesAsync(watchId.current);
      }
    };
  }, [visible]);

  const loadOfflineRoute = async () => {
    const coords = await AsyncStorage.getItem(`offline_route_coords_${faId}`);
    const steps = await AsyncStorage.getItem(`offline_instructions_${faId}`);

    if (coords && steps) {
      setRouteCoords(JSON.parse(coords));
      setInstructions(JSON.parse(steps));
    } else {
      console.log("No offline route found.");
      setRouteCoords([]);
      setInstructions([]);
    }
  };

  const startLocationTracking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Location permission is required for tracking."
      );
      return;
    }

    const subscriber = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 2000,
        distanceInterval: 1,
      },
      (location) => {
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });
        // checkIfOffRoute({ latitude, longitude });
        // checkIfOffRoute({ latitude: 37.7749, longitude: -122.4194 });
      }
    );

    watchId.current = subscriber;
  };

  const checkIfOffRoute = (location) => {
    const nearAny = routeCoords.some((coord) => isNear(coord, location));

    if (!nearAny && !offRoute) {
      setOffRoute(true);
      Alert.alert("Off Route", "You are off the saved path!");
    } else if (nearAny && offRoute) {
      setOffRoute(false);
      // Optional: Alert.alert('Back on Route', 'You are back on the path!');
    }
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
            <Text style={styles.headerText}>Offline Navigation</Text>
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="close" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                // latitude: userLocation?.latitude,
                // longitude: userLocation?.longitude,
                latitude: origin?.latitude,
                longitude: origin?.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              {/* <Marker coordinate={userLocation} title="Start" /> */}
              <Marker coordinate={origin} title="Start" pinColor="green" />
              <Marker coordinate={destination} title="End" pinColor="red" />
              {routeCoords.length > 0 && (
                <Polyline
                  coordinates={routeCoords}
                  strokeColor="blue"
                  strokeWidth={4}
                />
              )}
            </MapView>
            <View style={styles.panel}>
              <Text style={styles.instructionsTitle}>Instructions:</Text>
              {instructions.map((step) => (
                <Text key={step.id} style={styles.instruction}>
                  {step.instruction} ({step.distance})
                </Text>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OfflineMapNavigation;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "95%",
    height: "80%",
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

  // CSS for the map and panel
  map: {
    width: "90%",
    minHeight: 500,
    marginTop: 10,
    marginLeft: 120,
    // marginBottom: 20,
    // padding: 30,
  },
  mapContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    flexDirection: "row",
  },
  panel: {
    width: "20%",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  instructionsTitle: {
    marginTop: 10,
    fontWeight: "bold",
  },
  instruction: {
    fontSize: 12,
    marginVertical: 2,
  },
});
