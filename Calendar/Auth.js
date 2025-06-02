import React, {useEffect, useState} from 'react';
import {TextInput, View, StyleSheet, Text, TouchableOpacity} from "react-native";

import {AuthClient} from "./CalendarList";
import {changeLanguage, loadLanguage} from "./i18n";
import {useTranslation} from "react-i18next";
import * as Localization from "expo-localization";

const Auth = ({AuthClient}) => {
    useEffect(() => {
        startLang();
    }, []);

    const startLang = async () => {
        await loadLanguage();
    }
    startLang();

    const {t} = useTranslation()
    const locales = Localization.getLocales();

    const handleLanguageChanges = async (lang) => {
        await changeLanguage(lang);
    }


    const login = async () => {
        await AuthClient(false)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{t('welcome')}</Text>
            <View style={styles.languageBox}>
                <Text style={styles.buttonLanguage}
                onPress={()=> handleLanguageChanges('en')}
                >EN</Text>
                <Text style={styles.buttonLanguage}
                      onPress={()=> handleLanguageChanges('ua')}
                >UA</Text>
            </View>
            <TextInput
                placeholder={t('enter_login')}
                style={styles.input}
                placeholderTextColor="#888"
            />
            <TextInput
                placeholder={t('enter_password')}
                style={styles.input}
                secureTextEntry
                placeholderTextColor="#888"
            />


            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>{t('registration')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}
                          onPress={login}>{t('login')}</Text>
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
    languageBox: {
        flexDirection: 'row',


    },
    buttonLanguage: {
        padding: 4,
        backgroundColor: '#af8989',
        margin: 13,
        borderRadius: 8,
        width:40,
        textAlign:'center',
        color:'#ffffff'


    }
});

export default Auth;
