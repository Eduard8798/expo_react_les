import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const DisturbancePhotoScreen = ({setPhotoData}) => {

    const [image, setImage] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState(null);

    useEffect(() => {
        const loadUrl = async () => {
            try {
                const savedUrl = await AsyncStorage.getItem('uploadedImageUrl');
                if (savedUrl !== null) {
                    setUploadedUrl(savedUrl);
                }
            } catch (e) {
                console.error('Failed to load URL from AsyncStorage', e);
            }
        }
        loadUrl();
    }, []);


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
        let urlPath = null;

        if (!result.canceled) {
            urlPath = result.assets[0].uri
            setImage(urlPath)

            // байты для БЛОБ БД SQLite
            const base64Image = await FileSystem.readAsStringAsync(urlPath, {
                encoding: FileSystem.EncodingType.Base64,
            });
            const byteArray = Uint8Array.from(atob(base64Image), char => char.charCodeAt(0));

            setPhotoData(byteArray.length);
            // байты для БЛОБ
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
        formData.append('upload_preset', 'react_native_cloud')

        try {
            const response = await fetch(
                'https://api.cloudinary.com/v1_1/druvfoz4x/image/upload',
                {
                    method: 'POST',
                    body: formData
                }
            )
            const data = await response.json();
            if (data.secure_url){
                console.log('Uploaded Image:');
                console.log(data.secure_url)
                setUploadedUrl(data.secure_url); // сохраняем URL в состояние

                try {
                    await AsyncStorage.setItem('uploadedImageUrl', data.secure_url);
                    console.log('URL saved to AsyncStorage');
                } catch (e) {
                    console.error('Failed to save URL to AsyncStorage', e);
                }
            }else{
                console.error(data)
            }
        } catch (error) {
            console.error('error:', error)
        }
    }
    const handleOpenCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Ошибка', 'Нужен доступ к камере');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        let urlPath = null;
        if (!result.canceled) {
            urlPath = result.assets[0].uri
            setImage(urlPath);
            setPhotoData(urlPath) // props up for create
        }
        if (!urlPath){
            Alert.alert('File empty')
            return
        }
        const formData = new FormData();
        formData.append('file', {
            uri: urlPath,
            name: 'name_image.jpg',
            type: 'image/jpeg'
        })
        formData.append('upload_preset', 'react_native_cloud')

        try {
            const response = await fetch(
                'https://api.cloudinary.com/v1_1/druvfoz4x/image/upload',
                {
                    method: 'POST',
                    body: formData
                }
            )
            const data = await response.json();
            if (data.secure_url){
                console.log('Uploaded Image:');
                console.log(data.secure_url)
                setUploadedUrl(data.secure_url); // сохраняем URL в состояние

                try {
                    await AsyncStorage.setItem('uploadedImageUrl', data.secure_url);
                    console.log('URL saved to AsyncStorage');
                } catch (e) {
                    console.error('Failed to save URL to AsyncStorage', e);
                }
            }else{
                console.error(data)
            }
        } catch (error) {
            console.error('error:', error)
        }
    };

    useEffect(() => {
        console.log('image-console',image)
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📷 Фотофиксация нарушения</Text>

            <TouchableOpacity style={styles.button} onPress={handleOpenCamera}>
                <Text style={styles.buttonText}>Сделать фото</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handlePickImage}>
                <Text style={styles.buttonText}>Выбрать из галереи</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleUploadImage}>
                <Text style={styles.buttonText}>Сохранить фото</Text>
            </TouchableOpacity>

            {uploadedUrl && <Image source={{ uri: uploadedUrl }} style={styles.image} />}

            <StatusBar style="auto" />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 30,
        color: '#333',
    },
    button: {
        backgroundColor: '#4a90e2',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginBottom: 15,
        width: '100%',
        alignItems: 'center',
        elevation: 3, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    image: {
        width: 300,
        height: 300,
        marginTop: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});


export default DisturbancePhotoScreen;
