import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import Calendar from "./Calendar";
import CalendarList from "./CalendarList";
import TasksList from "./TasksList";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import Auth from "./Auth";
import LocationPage from "./LocationPage";
import {I18nextProvider} from "react-i18next";
import i18n, {loadLanguage} from './i18n';
import {useEffect} from "react";
import * as Localization from "expo-localization";  // <- вот это добавь

const Stack = createStackNavigator();

const App = () => {
    useEffect(() => {
        startLang();
    }, []);

    const startLang = async () => {
        await loadLanguage();
    }
    startLang();
    const locales = Localization.getLocales();


    return (

        <I18nextProvider i18n={i18n}>
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName={'Location'} >
            <Stack.Screen name={'CalendarList'} component={CalendarList}/>
            <Stack.Screen name={'Calendar'} component={Calendar}/>
            <Stack.Screen name={'TasksList'} component={TasksList}/>
            <Stack.Screen name={'AddTask'} component={AddTask}/>
            <Stack.Screen name={'EditTask'} component={EditTask}/>
            <Stack.Screen name={'Auth'} component={Auth}/>
            <Stack.Screen name={'Location'} component={LocationPage}/>
        </Stack.Navigator>
    </NavigationContainer>
        </I18nextProvider>
    );
}
export default App;


