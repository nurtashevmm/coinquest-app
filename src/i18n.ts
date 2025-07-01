import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Ресурсы переводов
const resources = {
  en: {
    translation: {
      "welcome": "Welcome",
      "hello": "Hello",
      "goodbye": "Goodbye",
      "loading": "Loading...",
      "error": "Error occurred",
      "submit": "Submit",
      "cancel": "Cancel"
    }
  },
  ru: {
    translation: {
      "welcome": "Добро пожаловать",
      "hello": "Привет",
      "goodbye": "До свидания", 
      "loading": "Загрузка...",
      "error": "Произошла ошибка",
      "submit": "Отправить",
      "cancel": "Отмена"
    }
  }
};

i18n
  .use(initReactI18next) // подключаем react-i18next
  .init({
    resources,
    lng: 'ru', // язык по умолчанию
    fallbackLng: 'en', // резервный язык
    
    interpolation: {
      escapeValue: false // React уже экранирует значения
    },
    
    // Опции для отладки (можно убрать в продакшене)
    debug: process.env.NODE_ENV === 'development'
  });

export default i18n;