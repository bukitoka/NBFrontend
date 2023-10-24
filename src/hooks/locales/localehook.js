// import { useMemo } from 'react'
// import { useTranslation } from 'react-i18next'
// import { localeOptions } from '@/presets/locale'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// // This is the hook that you will use in your components
// export function useLocale() {
//   const { t , i18n } = useTranslation()

//   // This is the currently selected locale
//   const selectedLocale = useMemo(() => {
//     return localeOptions.find((locale) => locale.code === i18n.language)
//   }, [i18n.language])

//   // Change the locale
//   const changeLocale = (language) => {
//     const locale = localeOptions.find((locale) => locale.code === language)
//     if (!locale) return

//     i18n.changeLanguage(language)
//     AsyncStorage.setItem('locale', language)
//   }

//   // This is a wrapper around the translate function
//   const t = (key, options) => {
//     return translate(key, options)
//   }

//   return {
//     t,
//     i18n,
//     changeLocale,
//     selectedLocale,
//     localeOptions,
//   }
// }

// export const useTranslation = useLocale
