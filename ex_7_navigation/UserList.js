import React , {useState} from 'react';
import {StyleSheet,Button, FlatList, Text, View} from "react-native";


const UserList = ({navigation}) => {

    const [users, setUsers] = useState([
        { id: '1', name: 'Alex Josh' },
        { id: '2', name: 'Stan Smith' },
        { id: '3', name: 'Liza Vasilieva' },
        { id: '4', name: 'Megan Brown' },
        { id: '5', name: 'Ivan Petrov' },
        { id: '6', name: 'Sarah Connor' },
        { id: '7', name: 'John Snow' },
        { id: '8', name: 'Emma Watson' },
    ]);


    return (
        <View style={style.container}>
        <FlatList data={users}
                  keyExtractor={(item)=>item.id}
                  renderItem={({item})=>(
                      <View style={style.card}>
                      <Text style={style.title}
                            onPress={()=> navigation.navigate('Details',{user: item})}
                          >{item.name}</Text>
                      </View>
                  )}

        />
        </View>
    );
};
const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#eaeaea',
    },
    card:{
        margin: 6,
        borderRadius: 28,
        backgroundColor: '#61dafb',
        color: '#20232a',
    },
    title: {
        padding:20,
        marginTop: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
})

export default UserList;
