import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { deleteUser, updateUser } from "./database";

const UsersDetails = ({ route, navigation }) => {
    const { user, loadUsers } = route.params;

    const [name, setName] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [phone, setPhone] = useState('');
    const [showInput, setShowInput] = useState(true);

    const deleteUserHandler = async (id) => {
        await deleteUser(id);
        loadUsers();
        navigation.goBack();
    };

    const updateUserHandler = async () => {
        if (editingId && name.trim() && phone.trim()) {
            await updateUser(name, phone, editingId);
            setEditingId(null);
            setName(null);
            setPhone(null);
            loadUsers();
        }
    };


    return (
        <View>


            {showInput ? (
                <View>
                    <Text  style={style.title && style.userItemStyle}>Name: {user.name}</Text>
                    <Text style={style.title && style.userItemStyle}>Phone: {user.phone}</Text>
                    <View style={style.buttonRow}>
                        <Text
                            style={style.buttonShow}
                            onPress={() => deleteUserHandler(user.id)}
                        >
                            Delete
                        </Text>
                        <Text
                            style={style.buttonShow}

                            onPress={() => {
                                setShowInput(false);
                                setName(user.name);
                                setPhone(user.phone);
                                setEditingId(user.id)
                            }}

                        >
                            Edit
                        </Text>
                    </View>

                </View>
            ) : (
                <View>
                    <TextInput
                        style={style.textInputEdit}
                        placeholder="Введите имя"
                        onChangeText={setName}
                    />
                    <TextInput
                        style={style.textInputEdit}
                        placeholder="Введите телефон"
                        keyboardType="phone-pad"
                        onChangeText={setPhone}
                    />
                    <View style={style.styleButtonUpdateForm}>
                    <Text
                        style={style.textButtonSave}
                        onPress={async () => {

                             await updateUserHandler()
                             await loadUsers();
                            setShowInput(true)
                        }}
                    >Save</Text>
                    <Text
                        style={style.textButtonCancel}
                        onPress={() => {setShowInput(true)}}
                    >Cancel</Text>
                    </View>
                </View>
            )}
        </View>
    );

};

const style = StyleSheet.create({
    title: {
        textAlign: 'center',
        marginTop: 25,
        fontSize: 35
    },
    buttonShow: {
        marginHorizontal: 10,
        borderRadius: 14,
        borderWidth: 1,
        backgroundColor: '#094aae',
        fontSize: 20,
        color: '#20f8f8',
        padding: 3
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
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
    textButtonSave:{
        borderWidth:1,
        borderRadius:16,
        backgroundColor:'rgb(40,77,135)',
        padding:8,
        width:70,
        marginTop:20,
        textAlign:'center',
        left:280


    },
    textButtonCancel:{
        borderWidth:1,
        borderRadius:16,
        backgroundColor:'rgb(40,77,135)',
        padding:8,
        width:70,
        height:35,
        marginTop:20,
        textAlign:'center',
        left:120,

    },
    styleButtonUpdateForm:{
        flexDirection: 'row',
    },
    userItemStyle:{
        marginVertical: 10,
        alignItems:'center',
        fontSize:25,
        borderWidth:1,
        borderRadius:18,
        padding:4,
        backgroundColor:'#949497'
    }
});

export default UsersDetails;
