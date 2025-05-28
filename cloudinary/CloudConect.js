import {Alert, Button, Image, Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import {StatusBar} from "expo-status-bar";

// export default function CloudConect() {
//     const [images, setImages] = useState([]);
//
//     const handlePickImage = async () => {
//         const {status} = await ImagePicker.getMediaLibraryPermissionsAsync();
//         console.log('Current permission status:', status);
//
//         if (status !== 'granted') {
//             const {status: newStatus} = await ImagePicker.requestMediaLibraryPermissionsAsync();
//             console.log('New permission status:', status);
//             if (status !== 'granted') {
//                 // Alert.alert(
//                 //     'Permission required',
//                 //     'Sorry, we need camera roll permissions to make this work!'
//                 // )
//                 Alert.alert(
//                     'Permission required',
//                     'Sorry, we need camera roll permissions to make this work! You can enable it in Settings.',
//                     [
//                         {text: 'Cancel', style: 'cancel'},
//                         {text: 'Open Settings', onPress: () => Linking.openSettings()}
//                     ]
//                 );
//                 return;
//             }
//         }
//
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: 'Images',
//             allowsEditing: false,
//             allowsMultipleSelection: true,
//             quality: 1,
//         })
//
//         if (!result.canceled) {
//             const uris = result.assets.map(asset => asset.uri);
//             console.log(uris)
//             setImages(uris)
//         }
//     }
//
//     return (
//         <View style={styles.container}>
//             <Button title="Pick anm image from gallery" onPress={handlePickImage}/>
//             <ScrollView style={styles.imageContainer}>
//                 {
//                     images.map((uri, index) => (
//                         <Image
//                             key={index}
//                             source={{uri}}
//                             style={styles.image}
//                         />
//                     ))
//                 }
//             </ScrollView>
//             <StatusBar style="dark"/>
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
//         paddingTop: 50,
//     },
//     imageContainer: {
//         marginTop: 20,
//         width: '100%'
//     },
//     image: {
//         width: 300,
//         height: 300,
//         marginTop: 20,
//     }
// });


export default function CloudConect() {
    const [image, setImage] = useState(null);

    const handlePickImage = async () => {
        const {status} = await ImagePicker.getMediaLibraryPermissionsAsync();
        console.log('Current permission status:', status);

        if (status !== 'granted') {
            const {status: newStatus} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            console.log('New permission status:', status);
            if (status !== 'granted') {
                // Alert.alert(
                //     'Permission required',
                //     'Sorry, we need camera roll permissions to make this work!'
                // )
                Alert.alert(
                    'Permission required',
                    'Sorry, we need camera roll permissions to make this work! You can enable it in Settings.',
                    [
                        {text: 'Cancel', style: 'cancel'},
                        {text: 'Open Settings', onPress: () => Linking.openSettings()}
                    ]
                );
                return;
            }
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
            allowsEditing: false,
            allowsMultipleSelection: true,
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    const handleUploadImage = async () => {
        if (!image) {
            Alert.alert('No image selected', 'Please pick an image first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', {
            uri: image,
            name: 'name_image.jpg',
            type: 'image/jpeg'
        })
        formData.append('upload_preset', 'testtest')

        try {
            const response = await fetch(
                'https://api.cloudinary.com/v1_1/dcayywgtr/image/upload',
                {
                    method: 'POST',
                    body: formData
                }
            )
            const data = await response.json();
            if (data.secure_url){
                console.log('Uploaded Image:');
                console.log(data.secure_url)
            }else{
                console.error(data)
            }
        } catch (error) {
            console.error('error:', error)
        }
    }

    return (
        <View style={styles.container}>
            <Button title="Pick anm image from gallery" onPress={handlePickImage}/>
            {image && <Image source={{uri: image}} style={styles.image}/>}
            {image && <Button title="Upload image" onPress={handleUploadImage}/>}
            <StatusBar style="dark"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    image: {
        width: 300,
        height: 300,
        marginTop: 20,
    }
});
