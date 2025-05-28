import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { Button, Image, StyleSheet, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const [image, setImage] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState(null);

    // Открыть камеру
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

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // Выбрать из галереи
    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Ошибка', 'Нужен доступ к галерее');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri
            setImage(imageUri);
            await AsyncStorage.setItem('uploadedImageUrl',imageUri );
        }
    };

    // Сохранить в галерею
    const handleSaveImage = async () => {
        if (!image) return;

        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Ошибка', 'Нужен доступ к медиатеке');
            return;
        }

        try {
            await MediaLibrary.saveToLibraryAsync(image);
            Alert.alert('Успешно', 'Изображение сохранено в галерею');
        } catch (error) {
            Alert.alert('Ошибка', 'Не удалось сохранить изображение');
        }
    };

    const loadUrl = async () => {
        try {
            const savedUrl = await AsyncStorage.getItem('uploadedImageUrl');
            console.log('choseImg',savedUrl)
            if (savedUrl !== null) {
                setUploadedUrl(savedUrl);
            }
        } catch (e) {
            console.error('Failed to load URL from AsyncStorage', e);
        }
    }

    useEffect(()=>{
        loadUrl();
        console.log('asyncUri',uploadedUrl)
    },[])

    return (
        <View style={styles.container}>
            <Button title="Open camera" onPress={handleOpenCamera} />
            <Button title="Pick an image from gallery" onPress={handlePickImage} />
            <Button title="Save image to gallery" onPress={handleSaveImage} />
            {/*{image && <Image source={{ uri: image }} style={styles.image} />}*/}
            {uploadedUrl ? <Image source={{ uri: uploadedUrl }} style={styles.image} /> : null}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    image: {
        width: 300,
        height: 300,
        marginTop: 20,
        borderRadius: 10,
    }
});
