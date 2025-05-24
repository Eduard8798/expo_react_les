import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {deleteTask, fetchTasks, insertTask, updateTask} from "./database";

const TasksList = ({navigation,route}) => {
const [text,setText] = useState('');
    const [tasks, setTasks] = useState([]);
    const {dayId} = route.params;

    const loadTasks = async () =>{
        const result = await fetchTasks(dayId);
        setTasks(result)
    }

    const deleteTaskItem = async (id) => {
        await deleteTask(id);
        const updatedTasks = tasks.filter(task => task.id !== id)
        setTasks(updatedTasks);

    }
    const saveTasks = async (title) => {
        const insertedId = await insertTask(title, dayId);
        if (!insertedId) {

            return;
        }
        setTasks(prev => [...prev, {insertedId,title,dayId}]);
        await loadTasks();

    }
    const changeTask = async (id,title ) => {
         const newChengeTask = await updateTask(id,title);
        // setTasks(prev => [...prev, {id,title}]);
        setTasks(prev =>
            prev.map(task => task.id === id ? { ...task, title } : task)
        );
        await loadTasks();
    }


    useEffect(() => {
        loadTasks();
        console.log('tasks',tasks)
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tasks:</Text>

            {tasks.length === 0 ? <Text>Not Task</Text> : <FlatList
                data={tasks}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.taskItemContainer}>

                        <Text style={styles.taskText} numberOfLines={1}
                        onPress={()=>navigation.navigate('EditTask',{changeTask,
                            id: item.id,
                            title: item.title, })}>
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
    },
    title: {
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
        padding:8
        //1
    },
    addButton: {
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
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',


    },

})

export default TasksList;
