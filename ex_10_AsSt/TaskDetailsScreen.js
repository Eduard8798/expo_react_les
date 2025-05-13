import {useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

export const TaskDetailsScreen = ({route, navigation}) => {
    const {task, updateTask} = route.params;
    const [taskText, setTaskText] = useState(task.text);
    const [completedTask,setCompletedTask] = useState(task.completed)

    const saveTask = async () => {
        if (!taskText.trim()) {
            alert('Task text cannot be empty')
        }

        updateTask({...task, text: taskText , completed:completedTask});
        // navigation.goBack();

    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Change your task:</Text>
            <TextInput
                style={styles.input}
                value={taskText}
                onChangeText={setTaskText}
                multiline
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={saveTask}
            >
                <Text style={styles.addButtonText}>Save</Text>
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
