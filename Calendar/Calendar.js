import React, {useState,useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import dayjs from 'dayjs';
import {Entypo} from "@expo/vector-icons";

const Calendar = () => {

    const [munthChange,setMunthChange] = useState(0);

const currentDay = dayjs();
    let today = dayjs();
    const prevMonth = today.subtract(munthChange, 'month');
    today = prevMonth
    const daysInMonth = today.daysInMonth();
    const firstDayOfMonth = today.date(0).day();
    const lastDayOfMonth = today.date(daysInMonth).day();
    const days = Array.from({length: daysInMonth}, (_, i) => today.date(i + 1).format('DD'));

    const week = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

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
}, [munthChange]);

    const [color,setColor] = useState('white');
    const [isDarkMode, setIsDarkMode] = useState(false);
const switchStyleColor = () => {
    setColor(prevState => (prevState === 'white' ? 'black' : 'white'))
    setIsDarkMode(prev => !prev)
}


console.log('isCurrentDay',isCurrentDay)


    const isCurrentDay = (day) => {
        const currentMonth = dayjs().subtract(munthChange, 'month');
        const dateToCheck = currentMonth.date(Number(day));
        return dayjs().isSame(dateToCheck, 'day');
    };







    return (

        <View style={isDarkMode ? styles.allBorder : styles.allBorderWhite}>
            <Entypo name={isDarkMode ? 'light-up' : 'moon'  }  size={34} onPress={switchStyleColor} color={isDarkMode ? 'white' : 'black'}  style={{left:150}}/>
            <View style={styles.buttonStyle}>

                <Text style={isDarkMode ? styles.monthStyle : styles.monthStyleWhite}>{prevMonth.format('MMMM YYYY').toString()}</Text>

                <AntDesign style={isDarkMode ? styles.textButMonthUp : styles.textButMonthUpWhite} name="up"  onPress={()=>setMunthChange(prev => (prev + 1))} />
                <AntDesign style={isDarkMode ? styles.textButMonthDown : styles.textButMonthDownWhite} name="down"  onPress={()=>setMunthChange(prev => (prev - 1))} />



            </View>
            <View style={styles.box}>

                {week.map((item, index) => (
                    <Text style={isDarkMode ? styles.cell : styles.cellWhite}  key={index}>{item}</Text>
                ))}

                {[...allDays.emptyDaysSet].map((item, index) => (
                    <Text style={isDarkMode ? [styles.cell, {backgroundColor: '#635e5e'}] :  [styles.cell, {backgroundColor: '#c6c6c8'}]} key={index}>{item}</Text>
                ))}

                {[...allDays.daysSet].map((item, index,day) => (

                    <Text style={[isDarkMode ? styles.cell : styles.cellWhite, isCurrentDay(item) && styles.today]}  key={index}>{item}</Text>
                ))}

                {[...allDays.emptyDaysEndSet].map((item, index) => (
                    <Text style={isDarkMode ? [styles.cell, {backgroundColor: '#635e5e'}] :  [styles.cell, {backgroundColor: '#c6c6c8'}]} key={index}>{item}</Text>
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
    allBorderWhite: {
        backgroundColor: '#fbfbfb',
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
    cellWhite: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#fbfbfb',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        lineHeight: 50,
        color: '#555454'
    },
    buttonStyle: {

        flexDirection: 'row',

        margin: 15

    },
    monthStyle: {
        fontSize: 25,
        color: '#ffffff',

        maxWidth:140,
        minWidth:140,
        maxHeight:70,
        minHeight:70

    },
    monthStyleWhite: {
        fontSize: 25,
        color: '#040303',
        maxWidth:140,
        minWidth:140,
        maxHeight:70,
        minHeight:70



    },
    textButMonthUp: {
        left: 100,
        fontSize: 35,
        color: '#ffffff',
        marginHorizontal:15

    },
    textButMonthUpWhite: {
        left: 100,
        fontSize: 35,
        color: '#020202',
        marginHorizontal:15,


    },
    textButMonthDown: {
        left: 80,
        fontSize: 35,
        color: '#ffffff',

    },textButMonthDownWhite: {
        left: 80,
        fontSize: 35,
        color: '#050505',


    },
    today:{

        backgroundColor:'#e46a04'
    }

});
