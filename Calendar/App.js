import { View,StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Calendar from "./Calendar";



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
