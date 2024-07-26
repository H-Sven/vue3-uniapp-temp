"use strict";
const common_vendor = require("../../common/vendor.js");
const sotre_main = require("../../sotre/main.js");
const utils_index = require("../../utils/index.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
const _sfc_main = {
  __name: "BasePage",
  props: {
    background: {
      type: String,
      default: ""
    },
    // 是否显示返回首页
    showHome: {
      type: Boolean,
      default: false
    },
    showBack: {
      type: Boolean,
      default: true
    },
    // 是否自定义返回方法， 组件需绑定 @handleBack方法
    customBack: {
      type: Boolean,
      default: false
    },
    // 页面title
    title: {
      type: String,
      default: ""
    },
    // 返回按钮颜色
    backIconColor: {
      type: String,
      default: "#333"
    }
  },
  emits: ["handleBack"],
  setup(__props, { emit: __emit }) {
    const { systemTools } = sotre_main.useMainStore();
    const { pageNavRect } = systemTools;
    const props = __props;
    const emit = __emit;
    common_vendor.onMounted(() => {
      common_vendor.index.$on("pageOnHide", pageOnHide);
    });
    common_vendor.onBeforeUnmount(() => {
      common_vendor.index.$off("pageOnHide", pageOnHide);
    });
    const pageOnHide = () => {
    };
    const handleBackHome = () => {
      common_vendor.index.reLaunch({ url: "/pages/index/index" });
    };
    const handleBack2 = () => {
      if (utils_index.hasPreviousPage()) {
        common_vendor.index.navigateBack();
      } else {
        common_vendor.index.reLaunch({ url: "/pages/index/index" });
      }
    };
    const handleBack = () => {
      if (props.customBack) {
        emit("handleBack");
      } else {
        handleBack2();
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.showHome
      }, __props.showHome ? {
        b: common_vendor.p({
          name: "home-o",
          color: __props.backIconColor
        }),
        c: common_vendor.o(handleBackHome)
      } : {}, {
        d: __props.showBack
      }, __props.showBack ? {
        e: common_vendor.p({
          name: "arrow-left",
          color: __props.backIconColor
        }),
        f: common_vendor.o(handleBack)
      } : {}, {
        g: __props.title
      }, __props.title ? {
        h: common_vendor.t(__props.title),
        i: __props.backIconColor
      } : {}, {
        j: common_vendor.unref(pageNavRect).sides + "px",
        k: common_vendor.unref(pageNavRect).height + "px",
        l: common_vendor.unref(pageNavRect).top + "px",
        m: common_vendor.unref(pageNavRect).sides + "px",
        n: common_vendor.unref(pageNavRect).height + "px",
        o: __props.background,
        p: common_vendor.unref(pageNavRect).height + "px"
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-34ef6681"]]);
wx.createComponent(Component);
