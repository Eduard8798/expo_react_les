import { Text, View,StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Auth from "./Auth";



const App = () => {
    return (
        <View style={styles.container}>
            <View>
            <Text>Please enter data</Text>
                <Auth/>
            <StatusBar style="auto" />
            </View>
        </View>
    );
}
export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    }
})
