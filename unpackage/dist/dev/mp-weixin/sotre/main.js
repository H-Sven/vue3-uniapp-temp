"use strict";
const common_vendor = require("../common/vendor.js");
const locales_index = require("../locales/index.js");
const utils_systemTools = require("../utils/system-tools.js");
const useMainStore = common_vendor.defineStore(
  "main",
  () => {
    const i18nLocale = common_vendor.ref("zh-CN");
    const switchLanguage = (lang) => {
      i18nLocale.value = lang;
      locales_index.i18n.global.locale.value = i18nLocale.value;
    };
    const systemTools = new utils_systemTools.SystemTools();
    systemTools.init();
    return { i18nLocale, switchLanguage, systemTools };
  },
  {
    unistorage: {
      // 初始化恢复前触发
      beforeRestore(ctx) {
      },
      // 初始化恢复后触发
      afterRestore(ctx) {
      }
    }
  }
);
exports.useMainStore = useMainStore;
