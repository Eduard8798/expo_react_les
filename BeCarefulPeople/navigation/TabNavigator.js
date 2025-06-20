import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingScreen from '../screens/SettingScreen'
import CalendarScreen from "../screens/CalendarScreen";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DisturbanceListScreen from "../screens/DisturbanceListScreen";
import DisturbanceCreateScreen from "../screens/DisturbanceCreateScreen";
import DisturbanceScreen from "../screens/DisturbanceScreen";
import {Ionicons} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const CalendarStackNavigator = ({ setDarkMode}) => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Calendar">
            {(props) => (
                <CalendarScreen
                    {...props}
                    setDarkMode={setDarkMode}
                />)}
        </Stack.Screen>
        <Stack.Screen name="DisturbanceList" component={DisturbanceListScreen}/>
        <Stack.Screen name="DisturbanceCreate" component={DisturbanceCreateScreen}/>
        <Stack.Screen name="DisturbanceScreen" component={DisturbanceScreen}/>
    </Stack.Navigator>
);

const TabNavigator = ({navigation, setDarkMode, darkMode}) => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarStyle: {
                    height: 60, // 🔽 уменьшает высоту таб-бара
                    paddingBottom: 4,
                    paddingTop: 4,
                },
                tabBarLabelStyle: {
                    fontSize: 12, // 🔽 уменьшает размер текста
                },
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === 'Calendar') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    } else if (route.name === 'Setting') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
            })}
        >
            <Tab.Screen name="Calendar" component={CalendarStackNavigator}/>
            <Tab.Screen name="Setting" component={SettingScreen}/>
        </Tab.Navigator>
    );
}
export default TabNavigator
