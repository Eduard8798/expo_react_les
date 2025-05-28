import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Text, TouchableOpacity} from "react-native";

import {AuthClient} from "./CalendarList";

const Auth = ({AuthClient}) => {

    const login = async () =>{
    await AuthClient(false)
    }

    return  (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome</Text>

            <TextInput
                placeholder="Enter login"
                style={styles.input}
                placeholderTextColor="#888"
            />
            <TextInput
                placeholder="Enter password"
                style={styles.input}
                secureTextEntry
                placeholderTextColor="#888"
            />

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Registration</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}
                    onPress={login}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fefefe',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        paddingHorizontal: 10,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    button: {
        flex: 1,
        backgroundColor: '#af8989',
        paddingVertical: 10,
        borderRadius: 12,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#f4f4f4',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Auth;
