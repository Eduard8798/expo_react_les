import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert, Button, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from 'react';
import AntDesign from "react-native-vector-icons/AntDesign";
import {Menu} from "react-native-paper";

export const TaskScreen = ({navigation}) => {
    const [tasks, setTasks] = useState([]);




    useEffect(() => {
        loadsTasks();


    }, []);

    const loadsTasks = async () => {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }

    const saveTasks = async (newTasks) => {
        await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
        setTasks(newTasks);
    }

    const updateTask = (updatedTask) => {
        const updatedTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
        setTasks(updatedTasks);
    }

    const deleteTask = (id) => {
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
                {text: 'Cancel', style: 'cancel'},
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        const newTasks = tasks.filter(task => task.id !== id);
                        saveTasks(newTasks);
                    }
                }
            ]
        )
    }

    const doneTask = (id) => {

        const newUpdateComplited = tasks.map(tasks => tasks.id === id ? {...tasks, completed: !tasks.completed }  : tasks)
        setTasks(newUpdateComplited)
        saveTasks(newUpdateComplited)
    }


    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState('All');

    const filterTasks = tasks.filter( task=> {
        if (selected === 'All')return task
        if (selected === 'Active')return task.completed
        if (selected === 'End')return !task.completed
    })

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
console.log('filterTask',filterTasks)

    return (

        <View style={styles.container}>

            <Text style={styles.title}>Tasks:</Text>

                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={<Button onPress={openMenu} title={selected}>Filter</Button>}>
                            <Menu.Item onPress={() => { setSelected('All'); closeMenu(); }} title="All" />
                            <Menu.Item onPress={() => { setSelected('Active'); closeMenu(); }} title="Active" />
                            <Menu.Item onPress={() => { setSelected('End'); closeMenu(); }} title="End" />
                        </Menu>

            { tasks.length === 0 ? <Text>Not Task</Text> : <FlatList
                data={filterTasks}
                renderItem={({item}) => (
                    <View style={styles.taskItemContainer}>
                        <TouchableOpacity
                            style={styles.taskItem}
                            onPress={() =>
                                navigation.navigate('TaskDetails', {
                                    task: item,
                                    updateTask
                                })
                            }
                        >
                            <Text style={item.completed ? styles.taskText : styles.taskText && styles.taskTextEnd } numberOfLines={1}>
                                {item.text}

                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteTask(item.id)}>
                            <Ionicons name="trash-outline" size={24} color="#ff5c5c"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => doneTask(item.id)}>
                            <AntDesign name={item.completed ?  'check':'close' } size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                )}
            />

            }

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddTask', {saveTasks, tasks})}
            >
                <Text style={styles.addButtonText}>+ Add New Task !!!</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        //1
    },
    containerProvider:{
        bottom:50,
        left:120,

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
        //1
    },
    taskTextEnd:{
        textDecorationLine: 'line-through',
        color:'#912323'
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
