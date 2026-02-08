// i18n.js - Simple internationalization system
import { APP_VERSION } from './version.js';

class I18n {
  constructor() {
    // Определяем язык по умолчанию
    this.defaultLanguage = 'ru';
    // Получаем язык из localStorage или используем язык браузера
    this.currentLanguage = localStorage.getItem('language') || 
                          navigator.language.split('-')[0] || 
                          this.defaultLanguage;
    
    // Проверяем, поддерживаем ли мы этот язык
    if (!this.supportedLanguages.includes(this.currentLanguage)) {
      this.currentLanguage = this.defaultLanguage;
    }
    
    // Загружаем переводы
    this.translations = {
      ru: {
        title: 'Генератор QR-кодов',
        inputLabel: 'Введите текст или URL:',
        inputPlaceholder: 'https://example.com',
        sizeLabel: 'Размер:',
        colorLabel: 'Цвет:',
        generateButton: 'Сгенерировать QR-код',
        downloadPng: 'Скачать PNG',
        downloadSvg: 'Скачать SVG',
        version: 'Версия',
        language: 'Язык',
        ru: 'Русский',
        en: 'Английский'
      },
      en: {
        title: 'QR Code Generator',
        inputLabel: 'Enter text or URL:',
        inputPlaceholder: 'https://example.com',
        sizeLabel: 'Size:',
        colorLabel: 'Color:',
        generateButton: 'Generate QR Code',
        downloadPng: 'Download PNG',
        downloadSvg: 'Download SVG',
        version: 'Version',
        language: 'Language',
        ru: 'Russian',
        en: 'English'
      }
    };
    
    // Применяем переводы
    this.applyTranslations();
  }
  
  get supportedLanguages() {
    return ['ru', 'en'];
  }
  
  // Получить перевод для ключа
  t(key) {
    const translation = this.translations[this.currentLanguage][key];
    return translation || key;
  }
  
  // Переключить язык
  switchLanguage(lang) {
    if (this.supportedLanguages.includes(lang)) {
      this.currentLanguage = lang;
      localStorage.setItem('language', lang);
      this.applyTranslations();
      // Обновляем динамически сгенерированные элементы
      this.updateDynamicElements();
    }
  }
  
  // Применить переводы к элементам страницы
  applyTranslations() {
    // Обновляем заголовок
    document.title = this.t('title');
    
    // Обновляем текстовые элементы
    this.updateElementText('text-input-label', this.t('inputLabel'));
    this.updateElementText('size-select-label', this.t('sizeLabel'));
    this.updateElementText('color-input-label', this.t('colorLabel'));
    this.updateElementText('generate-btn', this.t('generateButton'));
    this.updateElementText('download-png', this.t('downloadPng'));
    this.updateElementText('download-svg', this.t('downloadSvg'));
    
    // Обновляем placeholder
    const textInput = document.getElementById('text-input');
    if (textInput) {
      textInput.placeholder = this.t('inputPlaceholder');
    }
    
    // Обновляем опции размеров
    this.updateSelectOptions('size-select');
    
    // Обновляем версию (если есть)
    const versionDisplay = document.getElementById('version-display');
    if (versionDisplay && typeof APP_VERSION !== 'undefined') {
      versionDisplay.textContent = `${this.t('version')} ${APP_VERSION}`;
    }
    
    // Добавляем или обновляем переключатель языка
    this.addLanguageSwitcher();
  }
  
  // Обновить текст элемента
  updateElementText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = text;
    }
  }
  
  // Обновить опции select
  updateSelectOptions(selectId) {
    const select = document.getElementById(selectId);
    if (select) {
      // Для размера мы оставляем те же значения, но можем обновить метки при необходимости
      // В данном случае, размеры не требуют перевода
    }
  }
  
  // Обновить динамически созданные элементы
  updateDynamicElements() {
    // Обновляем favicon и OG-изображение при смене языка
    if (window.setFavicon) {
      window.setFavicon();
    }
    if (window.setOGImage) {
      window.setOGImage();
    }
  }
  
  // Добавить переключатель языка
  addLanguageSwitcher() {
    // Ищем место для переключателя языка
    const header = document.querySelector('h1');
    if (!header) return;
    
    // Удаляем старый переключатель, если он есть
    const oldSwitcher = document.getElementById('language-switcher');
    if (oldSwitcher) {
      oldSwitcher.remove();
    }
    
    // Создаем новый переключатель
    const switcher = document.createElement('select');
    switcher.id = 'language-switcher';
    switcher.className = 'language-switcher';
    
    // Добавляем опции
    this.supportedLanguages.forEach(lang => {
      const option = document.createElement('option');
      option.value = lang;
      option.textContent = this.t(lang);
      option.selected = lang === this.currentLanguage;
      switcher.appendChild(option);
    });
    
    // Добавляем обработчик событий
    switcher.addEventListener('change', (e) => {
      this.switchLanguage(e.target.value);
    });
    
    // Добавляем переключатель в заголовок
    header.appendChild(switcher);
  }
}

// Инициализируем i18n при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  window.i18n = new I18n();
});