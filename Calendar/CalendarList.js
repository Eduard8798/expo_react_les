import React, {useState} from 'react';
import {StyleSheet, View} from "react-native";
import Calendar from "./Calendar";
import {StatusBar} from "expo-status-bar";
import Auth, {AuthClient} from "./Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CalendarList = ({navigation}) => {


    const [darkMode, setDarkMode] = useState(false)
    const [auth, setAuth] = useState(true);


    const AuthClient = async (auth) => {
        await AsyncStorage.setItem("isLogin", JSON.stringify(auth));
        const value = await AsyncStorage.getItem("isLogin");
        const isLogin = JSON.parse(value); // Преобразуем из строки в true/false
        setAuth(isLogin);
    }

    return (

        <View style={darkMode ? styles.container : styles.whiteModeContainer}>
            <View>
                <StatusBar style="auto"/>
                {auth ? <Auth AuthClient={AuthClient}/> :
                    <Calendar navigation={navigation} setDarkMode={setDarkMode} darkMode={darkMode}/>
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
        padding: 6,
        backgroundColor: '#444'

    },
    whiteModeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,

    }
})

export default CalendarList;
