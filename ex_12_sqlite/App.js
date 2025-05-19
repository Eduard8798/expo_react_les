import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import CreateUser from "./CreateUser";
import TaskScreen from "./TaskScreen";
import {AddTaskScreen} from "./AddTask";


const Stack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'CreateUsers'} >
                <Stack.Screen name={'CreateUsers'} component={CreateUser}/>
                <Stack.Screen name={'TaskScreen'} component={TaskScreen}/>
                <Stack.Screen name={'AddTask'} component={AddTaskScreen}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
}
