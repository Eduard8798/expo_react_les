import React ,{useEffect,useMemo,useState} from 'react';
import {Dimensions, View, StyleSheet, Text, SafeAreaView} from "react-native";

export default function App() {
    const [orientation, setOrientation] = useState('');

    const handleOrientationChange = () => {
        const {width, height} = Dimensions.get('window');
        setOrientation(height >= width ? 'portrait' : 'landscape');
    }

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', handleOrientationChange);
        handleOrientationChange();
        return () => subscription.remove();
    }, []);

    const styles = useMemo(
        () => dynamicStyles(orientation),
        [orientation]
    );

    return (
        <SafeAreaView style={styles.container}>
        <View style={{flex: 1}}>
            <Text style={{fontSize: 30 , marginTop:20}}>{orientation === 'portrait' ? 'Ви використовуєте портретну орієнтацію' :
                'Ви використовуєте ландшафтну орієнтацію'}</Text>
            <View style={styles.box}></View>
        </View>
        </SafeAreaView>
    );
}
const dynamicStyles = (orientatoin) =>
    StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: orientatoin === 'portrait' ? 'white' : 'lightgrey'
            },
            box: {

                backgroundColor: orientatoin === 'portrait' ? 'blue' : 'red'
            }
        }
    )
