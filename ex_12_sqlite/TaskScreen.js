import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {deleteTask, fetchTasks, insertTask} from "./database";

const TaskScreen = ({route, navigation}) => {
    const {user} = route.params;
    const userId = user.id;
    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        loadsTasks();
        console.log('tasks',tasks)
    }, []);

    const loadsTasks = async () => {
        const storedTasks = await fetchTasks(userId);
        setTasks(storedTasks)
        console.log('storedTasks',storedTasks)
    }


    const saveTasks = async (title) => {
        const insertedId = await insertTask(title, userId);
        if (!insertedId) {

            return;
        }


        setTasks(prev => [...prev, {insertedId,title,userId}]);
        loadsTasks();

    }
    const deleteTaskItem = async (id) => {
        await deleteTask(id);
        const updatedTasks = tasks.filter(task => task.id !== id)
        setTasks(updatedTasks);

    }

    return (

        <View style={styles.container}>

            <Text style={styles.title}>Tasks:</Text>


            {tasks.length === 0 ? <Text>Not Task</Text> : <FlatList
                data={tasks}
                renderItem={({item}) => (
                    <View style={styles.taskItemContainer}>

                            <Text style={styles.taskText} numberOfLines={1}>
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
                style={styles.addButton}
                onPress={() => navigation.navigate('AddTask', {onSave: saveTasks})}
            >
                <Text style={styles.addButtonText}>Add Task</Text>
            </TouchableOpacity>
        </View>

    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        //1
    },
    containerProvider: {
        bottom: 50,
        left: 120,

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        //1
    },
    taskItemContainer: {
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
    taskItem: {
        flex: 1,
        padding: 10,
        //1
    },
    taskText: {
        fontSize: 16,
        padding:8
        //1
    },
    taskTextEnd: {
        textDecorationLine: 'line-through',
        color: '#912323'
    },
    addButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        //1
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
        fontSize: 16,
        marginBottom: 10,
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
        fontSize: 16,
        marginBottom: 10,
        minHeight: 150,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TaskScreen;
