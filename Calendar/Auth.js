import React, {useState} from 'react';
import {TextInput, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Auth = () => {
    const [auth,setAuth] = useState(true);
   let login = 'admin';
   let password = 1234;

    const AuthClient = async (auth) => {
        await AsyncStorage.setItem("tasks", JSON.stringify(auth));
        setAuth(auth);
    }
    return (
        <View>
            <TextInput
                placeholder="Enter login"
            />
            <TextInput
                placeholder="Enter password"
            />
        </View>
    );
};

export default Auth;
