import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthScreen = ({ setIsAuth }) => {
    const { t } = useTranslation();
    const [isLoginMode, setIsLoginMode] = useState(true);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                {isLoginMode ? t('login') : t('registration')}
            </Text>

            {isLoginMode ? (
                <LoginForm setIsAuth={setIsAuth} />
            ) : (
                <RegisterForm />
            )}

            <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setIsLoginMode(prev => !prev)}
            >
                <Text style={styles.toggleText}>
                    {isLoginMode ? t('no_account') : t('have_account')}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    header: { fontSize: 28, textAlign: 'center', marginBottom: 20 },
    toggleButton: { marginTop: 20, alignItems: 'center' },
    toggleText: { color: '#007bff', fontSize: 16 }
});

export default AuthScreen;
