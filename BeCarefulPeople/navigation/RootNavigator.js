import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from "./TabNavigator";
import SettingsScreen from "../screens/SettingsScreen";
import AuthScreen from "../screens/AuthScreen";

const Drawer = createDrawerNavigator();

const RootNavigator = ({navigation}) => {
    const [isAuth,setIsAuth] = useState(false);
    console.log('isAuth',isAuth)
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
            {!isAuth ? (
                <Drawer.Screen name="Auth">
                    {(props) => <AuthScreen {...props} setIsAuth={setIsAuth} />}
                </Drawer.Screen>
            ) : (
                <Drawer.Screen name="Main" component={TabNavigator} />
            )}
        </Drawer.Navigator>
    );
}
export default RootNavigator
