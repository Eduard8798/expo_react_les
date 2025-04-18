import React from 'react';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {TextInput, StyleSheet, Text, Button} from 'react-native';
import Input from "./Input";


const Auth = () => {

    const [error, setError] = React.useState( {name: '',
        lastName: '',numberPhone: '',password: '',passwordReplace: '',});

    const namehandler = (text) => {
        // onChangeName(text)
        const trimmed = text.trim();
        const re = '';
        if (trimmed==='' ){
            setError( prev=>({ ...prev, name: 'Ім’я не може бути порожнім або містити пробіли' }));
            return;
        }
        if (/\s/.test(trimmed)){
            setError( prev=>({ ...prev, name: ' є пробіли' }));
            return;
        }
        else {
            setError( prev=>({ ...prev, name: '' }));
            return;
        }

    }
    const lastNamehandler = (text) => {
        // onChangeLastName(text)
        const trimmed = text.trim();
        const re = '';
        if (trimmed===''  ){
            setError( prev=>({ ...prev, lastName: 'Ім’я не може бути порожнім або містити пробіли' }));
            return;
        }
        if (/\s/.test(trimmed)){
            setError( prev=>({ ...prev, lastName: ' є пробіли' }));
            return;
        }
        else {
            setError( prev=>({ ...prev, lastName: '' }));
            return;
        }

    }
    const numberPhone = (text) => {
        // onChangeLastName(text)
        const trimmed = text.trim();
        const re = '';
        if (trimmed===''  ){
            setError( prev=>({ ...prev, numberPhone: 'Ім’я не може бути порожнім або містити пробіли' }));
            return;
        }
        if (/\s/.test(trimmed)){
            setError( prev=>({ ...prev, numberPhone: ' є пробіли' }));
            return;
        }
        else {
            setError( prev=>({ ...prev, numberPhone: '' }));
            return;
        }

    }
    const password = (text) => {
        // onChangeLastName(text)
        const trimmed = text.trim();
        const re = '';
        if (trimmed===''  ){
            setError( prev=>({ ...prev, password: 'Ім’я не може бути порожнім або містити пробіли' }));
            return;
        }
        if (/\s/.test(trimmed)){
            setError( prev=>({ ...prev, password: ' є пробіли' }));
            return;
        }
        else {
            setError( prev=>({ ...prev, password: '' }));
            return;
        }

    }
    const passwordReplace = (text) => {
        // onChangeLastName(text)
        const trimmed = text.trim();
        const re = '';
        if (trimmed===''  ){
            setError( prev=>({ ...prev, passwordReplace: 'Ім’я не може бути порожнім або містити пробіли' }));
            return;
        }
        if (/\s/.test(trimmed)){
            setError( prev=>({ ...prev, passwordReplace: ' є пробіли' }));
            return;
        }

        else {
            setError( prev=>({ ...prev, passwordReplace: '' }));
            return;
        }

    }
    console.log('error',error)

    return (
        <SafeAreaProvider>
            <SafeAreaView>
            <Input
                error={error}
                   setError={setError}
                   valideName={namehandler}
                   valideLastName={lastNamehandler}
                validenumberPhone={numberPhone}
                validePassword={password}
                validePasswordReplace={passwordReplace}
            />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Auth;


