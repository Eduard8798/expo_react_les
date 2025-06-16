import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen'
import CalendarScreen from "../screens/CalendarScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DisturbanceListScreen from "../screens/DisturbanceListScreen";
import DisturbanceCreateScreen from "../screens/DisturbanceCreateScreen";
import DisturbancePhotoScreen from "../screens/DisturbancePhotoScreen";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const CalendarStackNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="DisturbanceList" component={DisturbanceListScreen} />
        <Stack.Screen name="DisturbanceCreate" component={DisturbanceCreateScreen} />
        {/*<Stack.Screen name="DisturbancePhoto" component={DisturbancePhotoScreen} />*/}
        {/*<Stack.Screen name="PhotoScreen" component={DisturbancePhotoScreen} />*/}

    </Stack.Navigator>
);

const TabNavigator = ({navigation}) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Calendar" component={CalendarStackNavigator}/>
            <Tab.Screen name="Setting" component={SettingScreen}/>
            <Tab.Screen name="DisturbanceCreate" component={DisturbanceCreateScreen} />
        </Tab.Navigator>
    );
}
export default TabNavigator
