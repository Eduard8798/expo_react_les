import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ExitScreen = ({ setIsAuth }) => {
    const handleExit = () => {
        setIsAuth(false)
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Вы действительно хотите выйти?</Text>
            <TouchableOpacity style={styles.button} onPress={handleExit}>
                <Text style={styles.buttonText}>Выйти</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#ff4d4d',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ExitScreen;
