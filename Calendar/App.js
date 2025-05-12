import { View,StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Calendar from "./Calendar";
// import {createStackNavigator} from "@react-navigation/stack";
// import {NavigationContainer} from "@react-navigation/native";
//
// const Stack = createStackNavigator();

const App = () => {
    return (

        <View style={styles.container}>
            <View>
            <Calendar/>
            <StatusBar style="auto" />
            </View>
        </View>
    );
}
export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    }
})
