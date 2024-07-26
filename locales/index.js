import { createI18n } from 'vue-i18n';
import en from './en.json'
import zhCN from './zh-CN.json'

const mainStore = uni.getStorageSync('main') ? JSON.parse(uni.getStorageSync('main')) : {}

const i18n = createI18n({
	legacy: false,
  locale: mainStore?.i18nLocale || 'zh-CN',
	fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
		'en': en
  },
});

export default i18n;
