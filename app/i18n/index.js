import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { NativeModules, Platform, I18nManager } from 'react-native';

import home_en from './translations/en.json';
import home_ar from './translations/ar.json';
import { getUserData } from "constants/commonFunctions";

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

export const getDeviceLang = async () => {

  const userData = await getUserData();
  const language = userData?.language;

  let deviceLanguage = Platform.OS === 'ios' ?
    NativeModules.SettingsManager.settings.AppleLocale :
    NativeModules.I18nManager.localeIdentifier;

  if (deviceLanguage === undefined) {
    // iOS 13 workaround, take first of AppleLanguages array 
    deviceLanguage = NativeModules.SettingsManager.settings.AppleLanguages[0]
    if (deviceLanguage == undefined) {
      return 'en'; // default language
    }
  }

  return language !== undefined ? language : ['ar'].includes(deviceLanguage.substring(0, 2)) ? 'ar' : 'en';
}

const i18nLang = async () =>
  i18n
    .use(initReactI18next)
    .init({
      // we init with resources
      resources: {
        en: {
          translations: {
            ...home_en
          }
        },
        ar: {
          translations: {
            ...home_ar
          }
        }
      },
      fallbackLng: "en",
      debug: false,

      // have a common namespace used around the full app
      ns: ["translations"],
      defaultNS: "translations",

      keySeparator: false, // we use content as keys

      interpolation: {
        escapeValue: false
      },

      otherLanguages: ['en', 'ar'],
      lng: await getDeviceLang(),
      preload: 'en',
    });

export default i18nLang;
