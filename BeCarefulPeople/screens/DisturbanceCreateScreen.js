import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import DisturbanceLocationScreen from "./DisturbanceLocationScreen";
import DisturbancePhotoScreen from "./DisturbancePhotoScreen";
import DisturbanceDescriptionScreen from "./DisturbanceDescriptionScreen";
import {insertDisturbance} from "../database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

const DisturbanceCreateScreen = ({navigation,route}) => {

    const {fullDate} = route.params;
    const [photoData,setPhotoData] = useState(null)
    const [descriptionData,setDescriptionData] = useState(null)
    const [locationData,setLocationData] = useState(null)
    const geoString = JSON.stringify(locationData);

    const [idUser,setIdUser] = useState(null)





    const createDist = async () => {

        if (!photoData || !descriptionData || !locationData) {
            console.log('❌ Недостаточно данных для создания записи');
            return;
        }
        // байты для БЛОБ БД SQLite


        const geoString = JSON.stringify(locationData); // строка из обьекта
        const createDis = await insertDisturbance(descriptionData.text,descriptionData.category,photoData,fullDate,geoString,idUser)
        console.log('✅ Нарушение создано:');



    };


    useEffect(() => {
        console.log('🔍 [useEffect] Обновились данные:');
        console.log('📍 locationData:', locationData,'geoSTRING',geoString);
        console.log('📝 descriptionData:', descriptionData);
        console.log(' fullDate:', fullDate);
        console.log('📷 photoData:', photoData);
        console.log('idTest', idUser);

    }, [photoData, descriptionData, locationData]);

    useEffect(() => {
        AsyncStorage.getItem('userId').then(id => {
            console.log('userId из AsyncStorage при монтировании:', id);
            setIdUser(id);
        });
    }, []);

    return (
        <View style={{flex:1}}>
        <ScrollView >
            <DisturbancePhotoScreen  setPhotoData={setPhotoData}/>
            <DisturbanceDescriptionScreen  setDescriptionData={setDescriptionData}/>
            <DisturbanceLocationScreen  setLocationData={setLocationData}/>
        </ScrollView>
            <TouchableOpacity
                style={styles.addButton }
                // onPress={() => navigation.navigate('DisturbanceCreate'
                // )
                onPress={()=> {
                    createDist();
                    navigation.goBack();
                }
                }
            >
                <Text style={ styles.addButtonText }>ADD Disturbance</Text>
            </TouchableOpacity>

        </View>
    );
};
const styles = StyleSheet.create({

    addButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        padding: 15,
        backgroundColor: '#300227',
        borderRadius: 5,
        alignItems: 'center',
    },addButtonText: {
        color: '#4a8df8',
        fontSize: 18,
        fontWeight: 'bold',
    },
})

export default DisturbanceCreateScreen;
