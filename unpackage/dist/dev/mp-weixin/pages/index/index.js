"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const locales_index = require("../../locales/index.js");
const sotre_main = require("../../sotre/main.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const { t } = locales_index.i18n.global;
    const mainStore = sotre_main.useMainStore();
    const title = common_vendor.ref("uniapp");
    const switchLanguage = (lang) => {
      mainStore.switchLanguage(lang);
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.t(title.value),
        c: common_vendor.t(common_vendor.unref(t)("首页")),
        d: common_vendor.o(($event) => switchLanguage("en"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
