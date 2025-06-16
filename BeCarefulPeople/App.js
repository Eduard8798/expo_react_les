import 'react-native-gesture-handler'; // важно для Drawer!
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import {StyleSheet} from 'react-native';
import {I18nextProvider} from "react-i18next";
import i18n, {loadLanguage} from './i18n';
import * as Localization from "expo-localization";

const App = () => {
    useEffect(() => {
        startLang();
    }, []);

    const startLang = async () => {
        await loadLanguage();
    }
    startLang();

    const locales = Localization.getLocales();

  return (
      <I18nextProvider i18n={i18n}>
      <NavigationContainer >
        <RootNavigator />
      </NavigationContainer>
      </I18nextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;
