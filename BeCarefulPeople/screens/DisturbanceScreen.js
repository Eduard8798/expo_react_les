import React, {useEffect, useState} from 'react';
import {Alert, Image, Text, View, StyleSheet, ScrollView} from "react-native";
import {fetchDisturbanceId, fetchDisturbanceItem, fetchImg} from "../database";
import MapView, {Marker} from "react-native-maps";


const DisturbanceScreen = ({route}) => {
    const {id} = route.params;

    const [DisturbanceItem, setDisturbanceItem] = useState(null);

    const [photoData, setPhotoData] = useState(null)
    const [category, setCategory] = useState(null)
    const [title, setTitle] = useState(null)
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [geos, setGeos] = useState(null)


    const showDisturbance = async () => {
        try {
            const result = await fetchDisturbanceId(id);

            if (result && result.length > 0) {
                const item = result[0];
                setCategory(item.category);
                setTitle(item.title);
                const geo = JSON.parse(JSON.parse(item.geolocation));
                setGeos(geo)
                if (geo){
                    setLatitude(parseFloat(geo.latitude))
                    setLongitude(parseFloat(geo.longitude))
                }
                else {
                    Alert.alert('data location not loading, try later...')
                }



                setPhotoData(item.urlImage)
                setDisturbanceItem(result);
            } else {
                console.warn('Данные нарушения не найдены');
            }
        } catch (err) {
            console.error('Ошибка при загрузке данных:', err);
        }
    };


    useEffect(() => {
        showDisturbance();

    }, []);


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.infoBlock}>
                <Text style={styles.label}>📂 Категория:</Text>
                <Text style={styles.value}>{category}</Text>

                <Text style={styles.label}>📋 Описание:</Text>
                <Text style={styles.value}>{title}</Text>
            </View>

            {photoData && (
                <Image
                    source={{ uri: photoData }}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}

            {geos && latitude != null && longitude != null ? (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                        coordinate={{ latitude, longitude }}
                        title="Местоположение"
                        description="Точка нарушения"
                    />
                </MapView>
            ) : (
                <Text style={styles.loadingText}>Загрузка местоположения...</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 32,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    infoBlock: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    value: {
        fontSize: 16,
        marginBottom: 12,
        color: '#555',
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#ddd',
    },
    map: {
        height: 300,
        borderRadius: 8,
    },
    loadingText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 16,
        marginTop: 12,
    },
});

export default DisturbanceScreen;
