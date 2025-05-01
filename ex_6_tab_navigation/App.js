import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Message from "./Message";
import Counter from "./Counter";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const BottomTab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor="gray"/>
            <BottomTab.Navigator
                initialRouteName="Message"
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: '#1e90ff',
                    tabBarInactiveTintColor: '#f3f3f3',
                    tabBarIndicatorStyle: { backgroundColor: '#64ba2b' },
                    tabBarStyle: { backgroundColor: '#0b0808' },
                    animationEnabled: false,
                    tabBarShowIcon: true,
                    tabBarIcon: ({ color }) => {
                        let iconName;

                        if (route.name === 'Message') {
                            iconName = 'checkbox-outline';
                        } else if (route.name === 'Counter') {
                            iconName = 'cloud';
                        }

                        return <Ionicons name={iconName} size={25} color={color} />;
                    },
                })}
            >
                <BottomTab.Screen name="Message" component={Message}/>
                <BottomTab.Screen name="Counter" component={Counter}/>
            </BottomTab.Navigator>
        </NavigationContainer>
    );
}
