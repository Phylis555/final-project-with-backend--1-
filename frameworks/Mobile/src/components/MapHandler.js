import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapHandler = ({ setLocation }) => {
  const [region, setRegion] = useState({
    latitude: 32.0853,
    longitude: 34.7818,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null);

  const handleMapPress = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });
    const address = `${addressResponse[0].street}, ${addressResponse[0].city}, ${addressResponse[0].region}`;
    const country = addressResponse[0].country;
    console.log(address)
    // Check if the selected location is in Israel
    if (country !== 'Israel' && country !== 'ישראל' && country !== 'השטחים הפלסטיניים') {
      Alert.alert('Error', 'הכתובת שבחרת לא נמצאת בישראל. אנא בחר כתובת בישראל.');
      return;
    }

    setLocation(address);
    setMarker({ latitude, longitude, address });
    setRegion({
      ...region,
      latitude,
      longitude,
    });
  };


  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onPress={handleMapPress}
      >
        {marker && (
          <Marker
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={"Selected Location"}
            description={marker.address}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300, // Adjust as needed
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapHandler;
