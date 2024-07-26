import { defineStore } from "pinia";
import { ref } from 'vue'
import i18n from "@/locales";
import SystemTools from '@/utils/system-tools.js'


export const useMainStore = defineStore("main", () => {
	
		const i18nLocale = ref('zh-CN')
		
		const switchLanguage = (lang) => {
			i18nLocale.value = lang
			i18n.global.locale.value = i18nLocale.value
		}
		
		const systemTools = new SystemTools()
		systemTools.init()
		
    return { i18nLocale, switchLanguage, systemTools };
		
  },
  {
		unistorage: {
			// 初始化恢复前触发
			beforeRestore(ctx) {},
			// 初始化恢复后触发
			afterRestore(ctx) {},
		},
  },
);
