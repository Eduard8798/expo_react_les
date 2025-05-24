import React from 'react';
import {StyleSheet, View} from "react-native";
import Calendar from "./Calendar";
import {StatusBar} from "expo-status-bar";

const CalendarList = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View>
                <StatusBar style="auto" />
                <Calendar navigation={navigation}/>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,

    }
})

export default CalendarList;
