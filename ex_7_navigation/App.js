import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import UserDetails from './UserDetails'
import UserList from './UserList'

const Stack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
        <Stack.Navigator
        initialRouteName={'Users'} >
            <Stack.Screen name={'Details'} component={UserDetails}/>
            <Stack.Screen name={'Users'} component={UserList}/>
        </Stack.Navigator>
        </NavigationContainer>
    );
}
