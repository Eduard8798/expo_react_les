import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useTranslation} from "react-i18next";
import {
    deleteDisturbance,
    fetchAllDisturbance, fetchDisturbance, fetchDisturbanceId,
    fetchDisturbanceItem,
    fetchDisturbanceItemNotImg,
    fetchImg
} from "../database";
import {useFocusEffect} from "@react-navigation/native";

const DisturbanceListScreen = ({navigation, route}) => {
    const {t} = useTranslation();

    const [list, setList] = useState(null);
    const [tDisturbance, setTDisturbance] = useState(null);
    const {fullDate, darkMode} = route.params;

    const fetchAllDist = async () => {
        const result = await fetchDisturbance(fullDate);
        setTDisturbance(result);
    }

    const deleteDist = async (id) => {
        await deleteDisturbance(id);
        const upDate = tDisturbance.filter(item => item.id !== id);

        setTDisturbance(upDate)

    }
    const updateList = () =>{
        setList(tDisturbance)
    }



    useEffect(() => {
        fetchAllDist();
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            fetchAllDist();
        }, [])
    );

    return (
        <View style={darkMode ? styles.container : styles.whiteContainer}>
            <Text style={darkMode ? styles.title : styles.whiteTitle}>{t('tasks_label')}</Text>

            {(tDisturbance?.length ?? 0) === 0 ? <Text>{t('no_tasks')}</Text> : <FlatList
                data={tDisturbance}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <View style={darkMode ? styles.taskItemContainer : styles.whiteTaskItemContainer}>

                        <Text style={darkMode ? styles.taskText : styles.whiteTaskText} numberOfLines={1}
                              onPress={() => navigation.navigate('DisturbanceScreen', {

                                   id: item.id,

                                  // title: item.title, darkMode
                              })}>
                            {item?.title || 'Нет текста'}

                        </Text>

                        <TouchableOpacity onPress={() => deleteDist(item.id)}>
                            <Ionicons name="trash-outline" size={24} color="#ff5c5c"/>
                        </TouchableOpacity>

                    </View>
                )}
            />

            }
            <TouchableOpacity
                style={darkMode ? styles.addButton : styles.whiteAddButton}
                onPress={() => {
                    navigation.navigate('DisturbanceCreate', {fullDate}
                    )
                }}
            >
                <Text
                    style={darkMode ? styles.addButtonText : styles.whiteAddButtonText}>{t('add_Disturbance_button')}</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#0b0b0b',
    }
    , whiteContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#fafafa'
    },
    whiteTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',

    },
    taskItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#616060',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,

        //1
    },
    whiteTaskItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,

        //1
    },
    taskText: {
        fontSize: 16,
        padding: 8,
        color: '#fff5f5'
    },
    whiteTaskText: {
        fontSize: 16,
        padding: 8
        //1
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        padding: 15,
        backgroundColor: '#300227',
        borderRadius: 5,
        alignItems: 'center',
    },
    whiteAddButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
    },

    addButtonText: {
        color: '#4a8df8',
        fontSize: 18,
        fontWeight: 'bold',
    },
    whiteAddButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

})

export default DisturbanceListScreen;
