import {SelectList} from 'react-native-dropdown-select-list'
import {useEffect, useState} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import axios from 'axios';

const App = () => {

    const [dataServer, setDataServer] = useState(null)
    const [selected, setSelected] = useState(null);
    const [gender, setGenders] = useState([]);


    const getData = () => {
        axios.get(`https://randomuser.me/api/?results=2&gender={gender}&inc=name,gender,phone,nat&noinfo`)
            .then(response => setDataServer(response.data))
            .catch(e => console.log('error', e))

    }

    const extractGenders = (data) => {
        if (data && data.results) {
            const genderList = [...new Set(data.results.map((user) => user.gender))];
            setGenders([...genderList,'All'])
            console.log('gender',gender)
        }


    };

    useEffect(() => {
        getData();

    }, [selected]);

    useEffect(() => {
        extractGenders(dataServer);
        console.log('Имя:', dataServer?.results[0]?.name?.first);
        console.log('gender:', gender);


    }, [dataServer]);


    return (
        <View style={style.container}>
            <SelectList
                setSelected={(val) => setSelected(val)}
                data={gender}
                save="value"
            />
            <FlatList data={dataServer?.results}
                      keyExtractor={(item) => item.phone}
                      renderItem={({item}) => (

                          <View>
                              <Text style={style.textNameInfo}>name:{item.name.first}</Text>
                              <Text style={style.textPhoneInfo}>phone:{item.phone}</Text>
                          </View>

                      )}/>
        </View>
    )

};
const style = StyleSheet.create({
    container: {
        marginTop: 50,
        padding: 10
    },
    textNameInfo:{
        padding:4,
        fontSize:16,
        borderRadius:26,
        borderColor:'#c31212',
        borderWidth: 1,
    }, textPhoneInfo:{
        padding:4,
        fontSize:22,
        borderRadius:16,
        borderColor:'#31a69d',
        borderWidth: 2,
        marginTop:7
    },
})
export default App;
