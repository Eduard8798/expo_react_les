import React, {useEffect, useState} from 'react';
import { TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import {fetchuserid} from "../database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginForm = ({ setIsAuth }) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (email && password) {

            const id = await fetchuserid(email);

            if (id && Array.isArray(id) && id.length > 0) {
                const userId = id[0].id; // взять первый объект и достать id
                await AsyncStorage.setItem('userId', userId.toString());
                console.log('✅ userId сохранён в AsyncStorage:', userId);
                setIsAuth(true);
            } else {
                alert(t('user_not_found'));
            }
        }

    };

    useEffect( () => {
        const getUserId = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                console.log('idUser', id);
            } catch (e) {
                console.log('Ошибка при получении userId', e);
            }
        };

        getUserId();
    }, []);

    return (
        <>
            <TextInput
                style={styles.input}
                placeholder={t('enter_email')}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder={t('enter_password')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>{t('login')}</Text>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 12,
        paddingHorizontal: 10,
        height: 45
    },
    button: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    }
});

export default LoginForm;
