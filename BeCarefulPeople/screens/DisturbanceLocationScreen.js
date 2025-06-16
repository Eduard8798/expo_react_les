import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const DisturbanceLocationScreen = ({setLocationData}) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    useEffect(() => {
        const locationData = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Доступ до локації заборонено');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);

            //обьект в БД SQLite

            // Берём только координаты:
            const { latitude, longitude } = currentLocation.coords;
            const geoString = JSON.stringify({ latitude, longitude });

            setLocationData(geoString); // на верх для создания
        };

        locationData();
    }, []);
    if (errorMsg) return <Text>{errorMsg}</Text>;
    if (!location) return <ActivityIndicator size="large" />;
    return (
        <View >
            <View>
                <MapView
                    style={{height: 300, width: '100%'}}
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    showsUserLocation
                >
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title="Ваша позиція"
                    />
                </MapView>
            </View>
        </View>
    );
};

export default DisturbanceLocationScreen;
