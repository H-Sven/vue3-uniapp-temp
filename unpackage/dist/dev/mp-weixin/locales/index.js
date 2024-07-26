"use strict";
const common_vendor = require("../common/vendor.js");
const en = {
  "首页": "home"
};
const zhCN = {
  "首页": "首页"
};
const mainStore = common_vendor.index.getStorageSync("main") ? JSON.parse(common_vendor.index.getStorageSync("main")) : {};
const i18n = common_vendor.createI18n({
  legacy: false,
  locale: (mainStore == null ? void 0 : mainStore.i18nLocale) || "zh-CN",
  fallbackLocale: "zh-CN",
  messages: {
    "zh-CN": zhCN,
    "en": en
  }
});
exports.i18n = i18n;
