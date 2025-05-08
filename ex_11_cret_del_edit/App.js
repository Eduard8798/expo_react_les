import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import UsersDetails from "./UsersDetails";
import CreateUsers from "./CreateUsers";

const Stack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'CreateUsers'} >
                <Stack.Screen name={'CreateUsers'} component={CreateUsers}/>
                <Stack.Screen name={'UsersDetails'} component={UsersDetails}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
