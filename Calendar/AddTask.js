import React, {useState} from 'react';
import {Text,StyleSheet,TextInput, TouchableOpacity, View} from "react-native";

const AddTask = ({navigation,route}) => {
    const {onSave,darkMode} = route.params;
    const [taskText, setTaskText] = useState('');

    const addTask = async () => {
        if (!taskText.trim()) {
            alert('Task text cannot be empty')
        }
        await onSave(taskText);
        navigation.goBack();
    }
    return (
        <View style={darkMode? styles.container : styles.whiteContainer}>
            <Text style={darkMode? styles.title : styles.whiteTitle}>Add new Task </Text>
            <TextInput
                style={styles.textArea}
                placeholder="Enter your task details here..."
                value={taskText}
                onChangeText={setTaskText}
                multiline
            />
            <TouchableOpacity
                style={styles.saveButton}
                onPress={addTask}
            >
                <Text style={styles.saveButtonText}>Save Task</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#0b0b0b',

    },
    whiteContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color:'#ffffff'
        //1
    },
    whiteTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        //1
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
        backgroundColor: '#300227',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    whiteSaveButton: {
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
})

export default AddTask;
