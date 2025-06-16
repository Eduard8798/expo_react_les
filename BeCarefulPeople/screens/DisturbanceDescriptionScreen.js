import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import dayjs from "dayjs";

const DisturbanceDescriptionScreen = ({setDescriptionData}) => {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const[textInputDes,setTextInputDes]=useState(null);
    const [description,setDescription] = useState(null);


    const saveDescriptionObj = (text) =>{
        const obj = {

            category: selectedCategory,
            text: text,
        };
        setDescription(obj);
        setDescriptionData(obj) // пропс на верх для create
    }


    return (
        <View style={styles.container}>


            <Text style={styles.label}>📂 Категория:</Text>
            <View style={styles.pickerWrapper}>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedCategory(value)}
                    value={selectedCategory}
                    placeholder={{ label: 'Выберите категорию...', value: null }}
                    items={[
                        { label: 'Админ', value: 'admin' },
                        { label: 'Криминал', value: 'crime' },
                    ]}
                    style={{
                        inputIOS: styles.pickerInput,
                        inputAndroid: styles.pickerInput,
                        iconContainer: {
                            top: 15,
                            right: 10,
                        },
                    }}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => <Ionicons name="chevron-down" size={24} color="gray" />}
                />
            </View>

            <Text style={styles.label}>📋 Описание:</Text>
            <TextInput
                style={styles.input}
                placeholder="Введите описание нарушения..."
                placeholderTextColor="#888"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                onChangeText={(text)=>{
                setTextInputDes(text) ;
                saveDescriptionObj(text);
                }
            }

            />



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 8,
        color: '#333',
    },
    time: {
        fontSize: 16,
        marginBottom: 20,
        color: '#555',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 20,
        overflow: 'hidden',
        height: 50,             // ОБЯЗАТЕЛЬНО для корректной работы iOS
        justifyContent: 'center',
    },
    pickerInput: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: 'black',
        paddingRight: 30,  // чтобы иконка не накладывалась на текст
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2,
    },
});

export default DisturbanceDescriptionScreen;
