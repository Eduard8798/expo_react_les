import React from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from "react-native";

const Input = ({error, setError, valideName, valideLastName,validenumberPhone,validePassword,validePasswordReplace}) => {
    const [name, onChangeName] = React.useState('');
    const [lastName, onChangeLastName] = React.useState('');
    const [numberPhone, onChangeNumberPhone] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [passwordReplace, onChangePasswordReplace] = React.useState('');

    const validateReplacePassword = () =>{
        if (password !== passwordReplace){
            setError(set =>({...set,passwordReplace: 'Not replace password'}) )

        }
    }
    const validateAll = () => {
        if (
            name.trim() !== '' &&
            lastName.trim() !== '' &&
            numberPhone.trim() !== '' &&
            password.trim() !== '' &&
            password === passwordReplace &&
            !/\s/.test(name) &&
            !/\s/.test(lastName)
        ) {
            Alert.alert("Input ok");
        } else {
            Alert.alert("Перевірте правильність введених даних");
        }
    };

    return (
        <View>
            { error.name ? <Text style={{color:'#e80202'}} >Error: {error.name}</Text> : null}
            <TextInput
                style={styles.input}

                onChangeText={onChangeName}


                value={name}
                placeholder="Name"
            />

            { error.lastName ? <Text style={{color:'#e80202'}} >Error: {error.lastName}</Text> : null}
            <TextInput
                style={styles.input}
                onChangeText={onChangeLastName}
                value={lastName}
                placeholder="LastName"
            />
            { error.numberPhone ? <Text style={{color:'#e80202'}} >Error: {error.numberPhone}</Text> : null}
            <TextInput
            style={styles.input}
            onChangeText={onChangeNumberPhone}
            value={numberPhone}
            placeholder="Number Phone"
            keyboardType="numeric"
        />
            { error.password ? <Text style={{color:'#e80202'}} >Error: {error.password}</Text> : null}

            <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder=" Your password"
        />
            { error.passwordReplace ? <Text style={{color:'#e80202'}} >Error: {error.passwordReplace}</Text> : null}

            <TextInput
                style={styles.input}
                onChangeText={onChangePasswordReplace}
                value={passwordReplace}
                placeholder="Replace your password"

            />
            <Button title={'ok'}
                     onPress={() => {
                         valideName(name);
                         valideLastName(lastName);
                         validenumberPhone(numberPhone);
                         validePassword(password);
                         validePasswordReplace(passwordReplace);
                         validateReplacePassword();
                         validateAll();
                     }
                     }/>
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    input: {
        height: 40,
        justifyContent: 'center',
        borderWidth: 1,
        padding: 10,
        borderRadius: 16,
        backgroundColor: '#f3f0f0',
        color: '#000087',
        marginVertical: 6,
        borderColor: '#284d87'
    },
});
