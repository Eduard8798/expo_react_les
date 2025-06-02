import i18next from 'i18next'
import * as Localization from 'expo-localization';
import {languages} from "../locales";
import {initReactI18next} from 'react-i18next';
import AsyncStorage from "@react-native-async-storage/async-storage";

const config = {

    SUPPORTED_LANGUAGES: Object.keys(languages),
    DEFAULT_LANGUAGE: 'en',
    APP_LANGUAGE: 'APP_LANGUAGE',
}

const getDeviceLanguage = () =>{
    const local = Localization.getLocales();
    return local?.[0]?.languageCode || config.DEFAULT_LANGUAGE;
}

const initialLang = config.SUPPORTED_LANGUAGES.includes(getDeviceLanguage())
? getDeviceLanguage()
    : config.DEFAULT_LANGUAGE;

i18next
    .use(initReactI18next)
    .init({
        resources: languages,
        lng: initialLang,
        fallback: config.DEFAULT_LANGUAGE,
        interpolation:{
            escapeValue: false
        }
    })

/**
 * Changes the app language and saves it to AsyncStorage.
 * @param {string} lang - The language code to switch (e.g., 'en', 'uk').
 * @returns {Promise<void>}
 */

export const changeLanguage = async (lang) =>{
    try {
        const selectLanguage = config.SUPPORTED_LANGUAGES.includes(lang) ? lang : config.DEFAULT_LANGUAGE
await i18next.changeLanguage(selectLanguage)
        await AsyncStorage.setItem(config.APP_LANGUAGE,selectLanguage)
        if (__DEV__){
            console.log(`change language to, ${selectLanguage}`)
        }
    }
    catch (error){
console.log(`Fail change language ${error}`)
    }
}

export const loadLanguage = async  () =>{
    const saveLanguage = await AsyncStorage.getItem(config.APP_LANGUAGE);

    try {
        if(saveLanguage && config.SUPPORTED_LANGUAGES.includes(saveLanguage)){
            await i18next.changeLanguage(saveLanguage);
            if (__DEV__){
                console.log('Loaded saved language',saveLanguage)
            }
            else {
                const deviceLang = getDeviceLanguage();
                const preferLang = config.SUPPORTED_LANGUAGES.includes(deviceLang)
                    ? deviceLang
                    : config.DEFAULT_LANGUAGE
                await i18next.changeLanguage(preferLang);
                if (__DEV__){
                    console.log('Loaded default language',saveLanguage)
                }
            }

        }
    }
    catch (error){
        console.log('filed to load language ',error)
    }
}
