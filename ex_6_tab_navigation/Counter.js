import React, {useState} from 'react';
import {StyleSheet,View, Text, Button, Alert} from "react-native";

const Counter = () => {
    const [counter,setCounter] = useState(1)

    const counterPlus = () => {

        setCounter(set => set + 1);

    }
    const counterMinus = () => {
        if (counter <= 0){
            Alert.alert('Count can not be less than 0')
            return;
        }
        setCounter(set => set - 1);

    }
    return (
        <View style={style.net}>
            <Text style={style.textNet} >Counter:{counter}</Text>
            <Button title={'up'} onPress={counterPlus}/>
            <Button title={'down'} onPress={counterMinus} />
        </View>
    );
};

const style = StyleSheet.create({
    net:{
        alignContent:'center',
        top:200,

    },
    textNet:{
        textAlign:'center',
        fontSize:35
    }
})

export default Counter;
