import React from 'react';
import {StyleSheet,View,Text} from "react-native";

const Message = () => {
    return (
        <View>
            <Text style={style.textBox}>Hello World</Text>
        </View>
    );
};
const style = StyleSheet.create({
    textBox:{

        textAlign:'center',
        top:200,
        fontSize:35
    }
})

export default Message;
