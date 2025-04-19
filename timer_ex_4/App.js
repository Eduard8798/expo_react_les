import {StyleSheet, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import Secundomer from "./Secundomer";



const App = () => {
    return (
        <View style={styles.container}>
            <View>
            <Secundomer/>

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
