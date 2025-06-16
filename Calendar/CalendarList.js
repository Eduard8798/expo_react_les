import React, {useEffect, useState} from 'react';
import {Button, Modal, StyleSheet, View, Text} from "react-native";
import Calendar from "./Calendar";
import {StatusBar} from "expo-status-bar";
import Auth, {AuthClient} from "./Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {changeLanguage} from "./i18n";
import {useTranslation} from "react-i18next";


const CalendarList = ({navigation}) => {


    const [darkMode, setDarkMode] = useState(false)
    const [auth, setAuth] = useState(true);
    const [login,setLogin] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const {t} = useTranslation()
    const AuthClient = async (auth) => {
        await AsyncStorage.setItem("isLogin", JSON.stringify(auth));
        const value = await AsyncStorage.getItem("isLogin");
        const isLogin = JSON.parse(value); // Преобразуем из строки в true/false
        setAuth(isLogin);
    }
    useEffect(() => {
        const checkLogin = async () => {
            const value = await AsyncStorage.getItem("isLogin");
            const isLogin = JSON.parse(value);
            if (isLogin) {
                setAuth(true); // вход сохранён
            } else {
                setAuth(false); // вход не был сохранён
            }
        };

        checkLogin();
    }, []);
    const handleLanguageChanges = async (lang) => {
        await changeLanguage(lang);
    }
    return (

        <View style={darkMode ? styles.container : styles.whiteModeContainer}>
            <View>
                <StatusBar style="auto"/>
                {auth ? (
                        <>

                            <Text style={styles.buttonLanguage} onPress={() => setModalVisible(true)}>
                                {t('change_language')}
                            </Text>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => setModalVisible(false)} // для Android
                            >
                                <View style={styles.modalBackground}>
                                    <View style={styles.modalContainer}>
                                        <Text >{t('change_language')}</Text>
                                        <View style={styles.flagModalContainer}>
                                            <Text style={styles.langModalbutton} onPress={() => handleLanguageChanges('ua')}>UA</Text>
                                            <Text style={styles.langModalbutton} onPress={() => handleLanguageChanges('en')}>EN</Text>
                                        </View>
                                        <Button title={t('Close_btn_modal')} onPress={() => setModalVisible(false)}/>
                                    </View>
                                </View>
                            </Modal>
                            <Auth AuthClient={AuthClient}/>
                        </>
                    )
                    :
                    (
                        <>
                        <Text style={styles.buttonLanguage} onPress={() => setModalVisible(true)}>
                            {t('change_language')}
                    </Text>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => setModalVisible(false)} // для Android
                            >
                                <View style={styles.modalBackground}>
                                    <View style={styles.modalContainer}>
                                        <Text >{t('change_language')}</Text>
                                        <View style={styles.flagModalContainer}>
                                            <Text style={styles.langModalbutton} onPress={() => handleLanguageChanges('ua')}>UA</Text>
                                            <Text style={styles.langModalbutton} onPress={() => handleLanguageChanges('en')}>EN</Text>
                                        </View>
                                        <Button title={t('Close_btn_modal')} onPress={() => setModalVisible(false)}/>
                                    </View>
                                </View>
                            </Modal>
                        <Calendar navigation={navigation} setDarkMode={setDarkMode} darkMode={darkMode}/>
                        </>
                        )
                }

            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#444',
        padding:1

    },
    whiteModeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding:1

    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)', // затемнение фона
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    flagModalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonLanguage: {
        padding: 4,
        backgroundColor: '#af8989',
        margin: 13,
        borderRadius: 8,
        textAlign:'center',
        color:'#ffffff',

    },
    langModalbutton:{
        padding: 4,
        backgroundColor: '#af8989',
        margin: 1,
        borderRadius: 8,
        textAlign:'center',
        color:'#ffffff',
    }
})

export default CalendarList;
