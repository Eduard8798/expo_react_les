import React, {useState,useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import dayjs from 'dayjs';

const Calendar = () => {


    const today = dayjs();
    const daysInMonth = today.daysInMonth();
    const firstDayOfMonth = today.date(0).day();
    const lastDayOfMonth = today.date(daysInMonth).day();
    const days = Array.from({length: daysInMonth}, (_, i) => today.date(i + 1).format('DD'));
    const month = today.month(0).format('MMMM YYYY');

    const week = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    const prevMonth = today.subtract(1, 'month');
    const daysInPrevMonth = prevMonth.daysInMonth();
    const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => {
        return (daysInPrevMonth - firstDayOfMonth + i + 1).toString();
    });

    const emptyDaysEnd = Array.from({ length: (7 - lastDayOfMonth) }, (_, i) => {
        return (i + 1).toString();
    });
    const [allDays,setAllDays] = useState({emptyDaysSet:[],daysSet:[],emptyDaysEndSet:[]});
    useEffect(() => {
    setAllDays({
        emptyDaysSet: emptyDays,
        daysSet: days,
        emptyDaysEndSet: emptyDaysEnd

    });
}, []);




        return (
        <View style={styles.allBorder}>
            <View style={styles.buttonStyle}>
                <Text style={styles.monthStyle}>{month.toString()}</Text>
                <Text style={[styles.textButMonthUp  ]} onPress={null}> > </Text>
                <Text style={styles.textButMonthDown} onPress={null}> > </Text>

            </View>
            <View style={styles.box}>

                {week.map((item, index) => (
                    <Text style={ styles.cell}  key={index}>{item}</Text>
                ))}

                {[...allDays.emptyDaysSet].map((item, index) => (
                    <Text style={[styles.cell, {backgroundColor: '#635e5e'}]} key={index}>{item}</Text>
                ))}
                {[...allDays.daysSet].map((item, index,day) => (
                    <Text style={ styles.cell}  key={index}>{item}</Text>
                ))}
                {[...allDays.emptyDaysEndSet].map((item, index) => (
                    <Text style={[styles.cell, {backgroundColor: '#635e5e'}]} key={index}>{item}</Text>
                ))}



                {/*{allDays.map((item, index) => (*/}
                {/*    <Text key={index} style={styles.cell}>{item}</Text>*/}
                {/*))}*/}


            </View>
        </View>
    );
};

export default Calendar;

const styles = StyleSheet.create({
    allBorder: {
        backgroundColor: '#424141',
    },
    box: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 1,

    },
    cell: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#555454',
        backgroundColor: '#424141',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        lineHeight: 50,
        color: '#fbfbfb'
    },
    buttonStyle: {

        flexDirection: 'row',
        margin: 15

    },
    monthStyle: {
        fontSize: 25,
        color: '#ffffff'

    },
    textButMonthUp: {
        left: 100,
        fontSize: 35,
        transform: [{rotate: '90deg'}],
        color: '#ffffff'

    },
    textButMonthDown: {
        left: 80,
        fontSize: 35,
        color: '#ffffff',
        transform: [{rotate: '-90deg'}],
    },
    emptyDaysSetStyle:{
        color:'#af0000'
    },
    emptyDaysEndSetStyle:{
        color:'#af0000'
    }

});
