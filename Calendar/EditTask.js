import React, {useEffect, useState} from 'react';
import {StyleSheet,Text, TextInput, TouchableOpacity, View} from "react-native";
import {useTranslation} from "react-i18next";

const EditTask = ({navigation,route}) => {
    const {t} = useTranslation();

    const { changeTask, id, title,darkMode } = route.params;
    const [taskText,setTaskText] = useState(title)

    const editTask = async () => {
        await changeTask(id,taskText);
        navigation.goBack();
    }
    useEffect(() => {
        console.log('taskText',taskText)
    }, [taskText]);

    return (
        <View style={darkMode? styles.container : styles.whiteContainer}>
            <Text style={darkMode? styles.title : styles.whiteTitle}>{t('change_task')}</Text>
            <TextInput
                style={styles.input}
                value={taskText}
                onChangeText={setTaskText}
                multiline
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={editTask}
            >
                <Text style={styles.addButtonText}>{t('save_edit_task')}</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#0b0b0b',
        //1
    },
    whiteContainer: {
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
        color:'#faf9f9'
        //1
    },
    whiteTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
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
});
export default EditTask;
