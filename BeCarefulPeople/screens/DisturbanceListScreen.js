import React, {useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useTranslation} from "react-i18next";

const DisturbanceListScreen = ({navigation, route}) => {
    const {t} = useTranslation();

    // const [text,setText] = useState('');
    const [tasks, setTasks] = useState([{id: 1, title: 'Task'}]);
    const {fullDate, darkMode} = route.params;

    return (
        <View style={darkMode ? styles.container : styles.whiteContainer}>
            <Text style={darkMode ? styles.title : styles.whiteTitle}>{t('tasks_label')}</Text>

            {tasks.length === 0 ? <Text>{t('no_tasks')}</Text> : <FlatList
                data={tasks}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <View style={darkMode ? styles.taskItemContainer : styles.whiteTaskItemContainer}>

                        <Text style={darkMode ? styles.taskText : styles.whiteTaskText} numberOfLines={1}
                              onPress={() => navigation.navigate('EditTask', {
                                  changeTask,
                                  id: item.id,
                                  title: item.title, darkMode
                              })}>
                            {item?.title || 'Нет текста'}

                        </Text>

                        <TouchableOpacity onPress={() => deleteTaskItem(item.id)}>
                            <Ionicons name="trash-outline" size={24} color="#ff5c5c"/>
                        </TouchableOpacity>

                    </View>
                )}
            />

            }
            <TouchableOpacity
                style={darkMode ? styles.addButton : styles.whiteAddButton}
                onPress={() => {
                    console.log('fullDateList', fullDate)
                    navigation.navigate('DisturbanceCreate', {fullDate}

                        // {onSave: saveTasks,darkMode}
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
