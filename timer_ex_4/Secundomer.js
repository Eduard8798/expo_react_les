import React, {useEffect,useState,useRef} from 'react';
import {StyleSheet, Button, Text, View} from "react-native";


const Secundomer = () => {
    const [second, setSecond] = useState(0);
    const [minut, setMinut] = useState(0);
    const [hours, setHours] = useState(0);
    const intervalRef = useRef(null);


    useEffect(()=>{
        timeSecond();
    },[])

        const timeSecond = () => {
            if (intervalRef.current) return;

            intervalRef.current=setInterval(() => {
                setSecond(prev=> {
                    if (prev + 1 > 59) {
                        setMinut(m => {
                            if (m+1>59) {
                                setHours(h=> h + 1)
                                return 0;
                            }
                            return m + 1;
                        })
                        return 0;
                    }
                    return prev + 1;

                })
            }, 1000)

        };



    const stopTime = () => {
        pauseTimer();
        setSecond(0);
        setMinut(0);
        setHours(0);

    }
    const pauseTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };


        return (
        <View style={style.table}>
            <View>
                <Text style={style.text}>
                    {second}:{minut}:{hours}
                </Text>
            </View>
            <View style={style.box}>
                <Button title={'start'}
                        onPress={timeSecond}

                />
                <Button title={'pause'}
                onPress={pauseTimer}/>
                <Button title={'stop'}
                onPress={stopTime}/>
            </View>
        </View>
    );


};
const style = StyleSheet.create({
    table:{
        flex: 1,
        justifyContent:'center'

    },
    box:{
        borderRadius:16,
        borderColor: '#333',
        borderWidth: 1,
        padding:10,
        marginTop:10,
        width:200,

    },
    text:{
        borderRadius:16,
        borderColor: '#333',
        borderWidth: 1,
        padding:10,
        width:200,
        fontSize:50,
        alignItems:'center',
        alignSelf: 'flex-end',
        gap: 10,
    }
});


export default Secundomer;

