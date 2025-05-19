import React, {useEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {createTable, deleteUser, fetchUsers, insertUser, updateUser} from "./database";
import {StatusBar} from "expo-status-bar";
import {Ionicons} from "@expo/vector-icons";

const CreateUser = ({navigation}) => {
    const [name, setName] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [users, setUsers] = useState([]);




    const addUserHandler = async () => {
        if (name.trim()) {
            const id = await insertUser(name);
            setName('');
            // loadUsers();// спосіб простий(робимо запит в базу данних)
            setUsers([...users, {id, name} ])//не робимо запит в Б.Д.
        }
    }

    const loadUsers = async () => {
        //start spinner
        const allUsers = await fetchUsers();
        console.log("allUsers", allUsers)
        setUsers(allUsers)
        //end spinner
    }

    useEffect(() => {
        createTable();
        loadUsers()

    }, []);

    const updateUserHandler = async () => {
        if (editingId && name.trim()) {
            await updateUser(name, editingId);
            setEditingId(null);
            setName(null);
            loadUsers();
        }
    }

    const deleteUserHandler = async (id) => {
        await deleteUser(id);
        loadUsers();
    }



    return (
        <View style={styles.container}>
            <Text>SQLite CRUD</Text>
            <TextInput
                style={styles.textInputEdit}
                placeholder="Enter user name"
                value={name}
                onChangeText={setName}
            />



            <TouchableOpacity
                style={styles.addButton}
                onPress={addUserHandler}
            >
                <Text style={styles.addButtonText}> Add New User</Text>
            </TouchableOpacity>


            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userItem}>
                        <TouchableOpacity
                            style={styles.userItemContent}
                            onPress={() => navigation.navigate('TaskScreen', { user: item })}
                        >
                            <Text style={styles.userItemText}>
                                {item.id}: {item.name}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => deleteUserHandler(item.id)}>
                            <Ionicons name="trash-outline" size={24} color="#ff5c5c" />
                        </TouchableOpacity>
                    </View>
                )}
            />



            <StatusBar style="auto"/>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop:1
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        marginBottom: 20,
        paddingLeft: 10,
    },
    userItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
        marginVertical: 5,
        width: 250,
    },

    userItemContent: {
        flex: 1, // занимает всё пространство
        flexDirection: 'row',
        alignItems: 'center',
    },

    userItemText: {
        fontSize: 20,
        color: '#000',
    },

    editButton: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginRight: 10,
    },
    deleteButton: {
        color: 'red',
        textDecorationLine: 'underline'
    },

    userItemStyle:{
        // marginVertical: 10,
        // alignItems:'center',
        // fontSize:25,
        // borderWidth:1,
        // borderRadius:18,
        // padding:4,
        // backgroundColor:'#949497'

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
        fontSize:26,
        width:250,
        padding:8

    },
    textInputEdit:{
        borderWidth:1,
        borderRadius:16,
        backgroundColor:'rgba(186,189,184,0.47)',
        marginHorizontal:50,
        marginTop:30,
        padding:12,
        textAlign:'center',
        width:250
    },
    addButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
        width:250
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        //1
    },

});
export default CreateUser;
