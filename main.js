import App from './App'
import i18n from './locales/index'

import { createSSRApp } from 'vue'
import { createI18n } from 'vue-i18n'
import * as Pinia from "pinia";
import { createUnistorage } from "./uni_modules/pinia-plugin-unistorage";

export function createApp() {
  const app = createSSRApp(App)
	const store = Pinia.createPinia()
	store.use(createUnistorage())

	
  
	
	app.use(i18n)
	app.use(store)
	
	
  return {
    app,
		Pinia,
  }
}
