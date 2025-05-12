// import {useState, useEffect} from 'react';
// import {StatusBar} from 'expo-status-bar';
// import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
// import AsyncStorage from "@react-native-async-storage/async-storage";
//
// //1.Збереження та отримання даних
//
// const STORAGE_KEY_USER_NAME = 'userName';
//
// export default function App() {
//
//     // fetch('https://jsonplaceholder.typicode.com/todos/1')
//     //     .then(response => response.json())
//     //     .then(json => console.log(json))
//
//     // const promise1 = fetch('https://jsonplaceholder.typicode.com/todos/1')
//     // const promise2 = promise1.then((response) => response.json())
//     // promise2.then((data) => console.log(data))
//
//     // console.log('start spinner')
//     // fetch('https://jsonplaceholder.typicode.com/todos/10')
//     //     .then(response => response.json())
//     //     .then(todo => console.log(todo.completed))
//     //     .catch((error) => console.log(error))
//     //     .finally(() => console.log('finish spinner'))
//     // console.log('something code...')
//
//     const [name, setName] = useState('');
//     const [saved, setSavedName] = useState('');
//
//     // const saveName = () => {
//     //     console.log('start')
//     //     const promise = AsyncStorage.setItem('userName', name);
//     //     promise
//     //         .then(() => {
//     //             console.log('success')
//     //             Alert.alert('Success', 'Name saved successfully!')
//     //             setSavedName(name);
//     //         })
//     //         .catch((error) => console.error(error));
//     //     console.log('finish')
//     // }
//
//     // const loadName = () => {
//     //     AsyncStorage.getItem('userName')
//     //         .then((res) => {
//     //             setSavedName(res);
//     //         })
//     //         .catch((error) => console.error(error));
//     // }
//
//     const saveName = async () => {
//         console.log('start')
//         await AsyncStorage.setItem(STORAGE_KEY_USER_NAME, name);
//         Alert.alert('Success', 'Name saved successfully!')
//         setSavedName(name);
//         console.log('finish')
//     }
//
//     const loadName = async () => {
//         console.log('start spinner')
//         try {
//             const res = await AsyncStorage.getItem(STORAGE_KEY_USER_NAME);
//             setSavedName(res);
//         } catch (err) {
//             console.error(err)
//         }
//         console.log('finish spinner')
//     }
//
//     const clearName = async () => {
//         await AsyncStorage.removeItem(STORAGE_KEY_USER_NAME);
//         setSavedName('');
//     }
//
//     useEffect(() => {
//         loadName();
//     }, []);
//
//
//     return (
//         <View style={styles.container}>
//             <Text>Enter your name!</Text>
//             <TextInput
//                 style={{borderWidth: 1, marginBottom: 10, padding: 5, width: 200}}
//                 value={name}
//                 onChangeText={setName}
//             />
//             <Button title="Save name" onPress={saveName}/>
//             <Button title="Clear name" onPress={clearName}/>
//             {saved && <Text style={{marginTop: 20}}>Hello, {saved}!</Text>}
//             <StatusBar style="auto"/>
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });

import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {TaskScreen} from "./TaskScreen";
import {AddTaskScreen} from "./AddTaskScreen";
import {TaskDetailsScreen} from "./TaskDetailsScreen";

const Stack = createStackNavigator();


const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Tasks" component={TaskScreen}/>
                <Stack.Screen name="AddTask" component={AddTaskScreen}/>
                <Stack.Screen name="TaskDetails" component={TaskDetailsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default App;


