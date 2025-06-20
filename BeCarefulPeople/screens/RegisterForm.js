import React, {useEffect, useState} from 'react';
import { TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import {createTable, insertUser} from "../database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterForm = ({ setIsAuth}) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');



    const handleRegister = async () => {

        if (name && surname && email && phone && password) {
            try {
                const userId = await insertUser(name, surname, email, phone, password);
                if (userId) {
                    await AsyncStorage.setItem('userId',userId.toString())

                    alert(t('registration_success'));
                    setIsAuth(true);
                    // тут можно сохранить userId или перейти на главный экран
                }
            } catch (e) {
                // например, если email уже существует
                alert(e.toString());
            }
        } else {
            alert(t('fill_fields'));
        }
    };
    const createTableUser = async () =>{
        await createTable();
    }

    useEffect(()=>{
        createTableUser();
    },[])



    return (
        <>
            <TextInput
                style={styles.input}
                placeholder={t('enter_name')}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder={t('enter_surname')}
                value={surname}
                onChangeText={setSurname}
            />
            <TextInput
                style={styles.input}
                placeholder={t('enter_email')}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder={t('enter_phone')}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder={t('enter_password')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>{t('registration')}</Text>
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
        backgroundColor: '#28a745',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    }
});

export default RegisterForm;
