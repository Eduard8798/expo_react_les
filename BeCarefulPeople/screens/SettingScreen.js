import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';

const SettingScreen = () => {
    const { t, i18n } = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);

    const handleLanguageChanges = (lang) => {
        i18n.changeLanguage(lang);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.buttonLanguage}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.buttonLanguageText}>{t('change_language')}</Text>
            </TouchableOpacity>

            <Modal
                transparent
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable style={styles.modalBackground} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>{t('change_language')}</Text>
                        <View style={styles.flagModalContainer}>
                            <TouchableOpacity
                                style={styles.langModalButton}
                                onPress={() => handleLanguageChanges('ua')}
                            >
                                <Text style={styles.langModalText}>🇺🇦 UA</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.langModalButton}
                                onPress={() => handleLanguageChanges('en')}
                            >
                                <Text style={styles.langModalText}>🇬🇧 EN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLanguage: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#673AB7',
        borderRadius: 10,
    },
    buttonLanguageText: {
        color: '#fff',
        fontSize: 16,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 25,
        borderRadius: 15,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
    },
    flagModalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    langModalButton: {
        backgroundColor: '#E0E0E0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    langModalText: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export default SettingScreen;
