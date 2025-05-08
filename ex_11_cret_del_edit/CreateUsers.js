import React, {useEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {createTable, deleteUser, fetchUsers, insertUser, updateUser} from "./database";
import {StatusBar} from "expo-status-bar";

const CreateUsers = ({navigation}) => {
    const [name, setName] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [users, setUsers] = useState([]);
    const [phone, setPhone] = useState('');



    const addUserHandler = async () => {
        if (name.trim()) {
            const id = await insertUser(name,phone);
            setName('');
            // loadUsers();// спосіб простий(робимо запит в базу данних)
            setUsers([...users, {id, name,phone} ])//не робимо запит в Б.Д.
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

    useEffect(() => {
        createTable();
    }, []);
    
    return (
        <View style={styles.container}>
            <Text>SQLite CRUD</Text>
            <TextInput
                style={styles.textInputEdit}
                placeholder="Enter user name"
                value={name}
                onChangeText={setName}
            />
            <View style={styles.phoneTitle}>
            <TextInput
                style={styles.textInputEdit}
                placeholder="Enter user phone"
                value={phone}
                onChangeText={setPhone}
            />
            </View>

                    <Button title="Add User" onPress={addUserHandler}/>


            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View style={styles.userItem}>
                        <Text
                            style={styles.userItemStyle}
                            onPress={()=> navigation.navigate('UsersDetails',{user: item,loadUsers,setEditingId,setName,setPhone,editingId})} >
                            {item.id}: {item.name}</Text>

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
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    phoneTitle:{
        marginTop:10,
        padding:3,
        borderTopWidth:1,
    },
    userItemStyle:{
        marginVertical: 10,
        alignItems:'center',
        fontSize:25,
        borderWidth:1,
        borderRadius:18,
        padding:4,
        backgroundColor:'#949497'
    },
    textInputEdit:{
        borderWidth:1,
        borderRadius:16,
        backgroundColor:'rgba(177,225,158,0.47)',
        marginHorizontal:50,
        marginTop:30,
        padding:8,
        textAlign:'center'
    },
});
export default CreateUsers;
