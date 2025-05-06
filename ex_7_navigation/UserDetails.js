import React from 'react';
import {StyleSheet,Text, View} from "react-native";

const UserDetails = ({route}) => {
    const {user} = route.params;
    return (
        <View>
            <Text style={style.title}>Name: {user.name}</Text>
        </View>
    );
};

const style = StyleSheet.create({
    title:{

        textAlign:'center',
        top:25,
        fontSize:30,
        borderRadius:20,
        backgroundColor:'#c66718',
        borderColor:'#555454',
        borderWidth:3,
        marginHorizontal:20,

    }
})

export default UserDetails;
