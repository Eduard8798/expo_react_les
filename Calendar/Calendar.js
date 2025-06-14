import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import dayjs from 'dayjs';
import {Entypo} from "@expo/vector-icons";
import {createTable, fetchAllTasks, fetchDays, fetchTasks, insertDays} from "./database";
import {useTranslation} from "react-i18next";

const Calendar = ({navigation,setDarkMode,darkMode}) => {
    const {t} = useTranslation()
const [taskId,setTaskId] = useState([])

const [dayTask,setDayTasks] = useState([])
    const [munthChange, setMunthChange] = useState(0);

    // const currentDay = dayjs();

    let today = dayjs();
    const prevMonth = today.subtract(munthChange, 'month');
    today = prevMonth
    const daysInMonth = today.daysInMonth();
    const firstDayOfMonth = today.date(0).day();
    const lastDayOfMonth = today.date(daysInMonth).day();
    const days = Array.from({length: daysInMonth}, (_, i) => today.date(i + 1).format('DD'));

    // const week = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const week= t('week', { returnObjects: true });

    const daysInPrevMonth = prevMonth.daysInMonth();
    const emptyDays = Array.from({length: firstDayOfMonth}, (_, i) => {
        return (daysInPrevMonth - firstDayOfMonth + i + 1).toString();
    });

    const emptyDaysEnd = Array.from({length: (7 - lastDayOfMonth)}, (_, i) => {
        return (i + 1).toString();
    });
    const [allDays, setAllDays] = useState({emptyDaysSet: [], daysSet: [], emptyDaysEndSet: []});
    useEffect(() => {
        setAllDays({
            emptyDaysSet: emptyDays,
            daysSet: days,
            emptyDaysEndSet: emptyDaysEnd

        });
    }, [munthChange]);

    const [color, setColor] = useState('white');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const switchStyleColor = () => {
        setColor(prevState => (prevState === 'white' ? 'black' : 'white'))
        setIsDarkMode(prev => !prev)
        setDarkMode(prev => !prev)

    }

    const isCurrentDay = (day) => {
        const currentMonth = dayjs().subtract(munthChange, 'month');
        const dateToCheck = currentMonth.date(Number(day));
        return dayjs().isSame(dateToCheck, 'day');
    };


    useEffect(() => {
        createTable();
        loadDays();
        loadTaskNotId();
    }, []);
    useEffect(() => {

    }, []);



     const createIdDay = async (fullDate) => {
        return await insertDays(fullDate);
    };

    const loadDays = async () => {
        const days = await fetchDays();
        setDayTasks(days);
        console.log('daysLoadays',days)
    };
    const loadTaskNotId = async () => {

        const taskId = await fetchAllTasks();
        setTaskId(taskId)
        console.log('taskId',taskId)

    }

    const isTaskDay = (day) => {
        const fullDate = prevMonth.date(Number(day)).format('YYYY-MM-DD'); // собираем дату вида "2025-05-01"
        return dayTask.some(task => task.data === fullDate && taskId.some(t=> t.title !== '' && task.id === t.day_id));

    }
    return (

        <View style={isDarkMode ? styles.allBorder : styles.allBorderWhite}>
            <Entypo name={isDarkMode ? 'light-up' : 'moon'} size={34} onPress={switchStyleColor}
                    color={isDarkMode ? 'white' : 'black'} style={{left: 150}}/>
            <View style={styles.buttonStyle}>

                <Text
                    style={isDarkMode ? styles.monthStyle : styles.monthStyleWhite}>{prevMonth.format('MMMM YYYY').toString()}</Text>

                <AntDesign style={isDarkMode ? styles.textButMonthUp : styles.textButMonthUpWhite} name="up"
                           onPress={() => setMunthChange(prev => (prev + 1))}/>
                <AntDesign style={isDarkMode ? styles.textButMonthDown : styles.textButMonthDownWhite} name="down"
                           onPress={() => setMunthChange(prev => (prev - 1))}/>


            </View>
            <View style={styles.box}>

                {week.map((item, index) => (
                    <Text style={isDarkMode ? styles.cell : styles.cellWhite} key={index}>{item}</Text>
                ))}

                {[...allDays.emptyDaysSet].map((item, index) => (
                    <Text
                        style={isDarkMode ? [styles.cell, {backgroundColor: '#635e5e'}] : [styles.cell, {backgroundColor: '#c6c6c8'}]}
                        key={index}>{item}</Text>
                ))}

                {[...allDays.daysSet].map((item, index, day) => (
<View key={index}>
                    <Text style={[isDarkMode ? styles.cell : styles.cellWhite,
                        isCurrentDay(item) && styles.today,]}
                          // key={index}

                          onPress={async () => {
                              const fullDate = prevMonth.date(Number(item)).format('YYYY-MM-DD'); // Собираем дату
                              const dayId = await createIdDay(fullDate); // Передаем в insertDays именно дату в строке
                              console.log('isCurrentDay()', item);
                              fetchDays();
                              loadDays();
                              navigation.navigate('TasksList', { dayId ,darkMode });
                          }}
                    >{item}
                   </Text>
    {isTaskDay(item) ?  <View style={styles.taskDay}/> : null}
    </View>
                ))}

                {[...allDays.emptyDaysEndSet].map((item, index) => (
                    <Text
                        style={isDarkMode ? [styles.cell, {backgroundColor: '#635e5e'}] : [styles.cell, {backgroundColor: '#c6c6c8'}]}
                        key={index}>{item}</Text>
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

        maxWidth: 140,
        minWidth: 140,
        maxHeight: 70,
        minHeight: 70

    },
    monthStyleWhite: {
        fontSize: 25,
        color: '#040303',
        maxWidth: 140,
        minWidth: 140,
        maxHeight: 70,
        minHeight: 70


    },
    textButMonthUp: {
        left: 100,
        fontSize: 35,
        color: '#ffffff',
        marginHorizontal: 15

    },
    textButMonthUpWhite: {
        left: 100,
        fontSize: 35,
        color: '#020202',
        marginHorizontal: 15,


    },
    textButMonthDown: {
        left: 80,
        fontSize: 35,
        color: '#ffffff',

    }, textButMonthDownWhite: {
        left: 80,
        fontSize: 35,
        color: '#050505',


    },
    today: {

        backgroundColor: '#e46a04'
    },
    taskDay:{
        backgroundColor: '#a80101',
        padding:2,
        maxWidth:3,
        minHeight:3,
        left:22,
        borderRadius:100
    }

});
