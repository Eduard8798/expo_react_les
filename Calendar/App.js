import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import Calendar from "./Calendar";
import CalendarList from "./CalendarList";
import TasksList from "./TasksList";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import Auth from "./Auth";

const Stack = createStackNavigator();

const App = () => {
    return (


    <NavigationContainer>
        <Stack.Navigator
            initialRouteName={'CalendarList'} >
            <Stack.Screen name={'CalendarList'} component={CalendarList}/>
            <Stack.Screen name={'Calendar'} component={Calendar}/>
            <Stack.Screen name={'TasksList'} component={TasksList}/>
            <Stack.Screen name={'AddTask'} component={AddTask}/>
            <Stack.Screen name={'EditTask'} component={EditTask}/>
            <Stack.Screen name={'Auth'} component={Auth}/>

        </Stack.Navigator>
    </NavigationContainer>
    );
}
export default App;


