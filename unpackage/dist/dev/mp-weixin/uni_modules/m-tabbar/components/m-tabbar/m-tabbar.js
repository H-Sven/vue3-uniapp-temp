"use strict";
const common_vendor = require("../../../../common/vendor.js");
const pages = [
  {
    path: "pages/index/index",
    style: {
      navigationBarTitleText: "首页"
    }
  },
  {
    path: "pages/user/user",
    style: {
      navigationBarTitleText: "我的"
    }
  },
  {
    path: "pages/order/order",
    style: {
      navigationBarTitleText: "订单"
    }
  }
];
const tabBar = {
  color: "#fff",
  selectedColor: "#707070",
  borderStyle: "black",
  backgroundColor: "#1d3576",
  height: "50px",
  fontSize: "16px",
  iconWidth: "24px",
  spacing: "3px",
  list: [
    {
      pagePath: "pages/index/index",
      iconPath: "/static/images/chatUnSelcect.png",
      selectedIconPath: "/static/images/chatSelect.png",
      text: "首页"
    },
    {
      pagePath: "pages/order/order",
      iconPath: "/static/images/myUnSelect.png",
      selectedIconPath: "/static/images/mySelect.png",
      text: "订单",
      bulge: true
    },
    {
      pagePath: "pages/user/user",
      iconPath: "/static/images/userUnselect.png",
      selectedIconPath: "/static/images/userselect.png",
      text: "我的"
    }
  ]
};
const globalStyle = {
  navigationBarTextStyle: "black",
  navigationBarTitleText: "uni-app",
  navigationBarBackgroundColor: "#F8F8F8",
  backgroundColor: "#F8F8F8"
};
const uniIdRouter = {};
const PageConfig = {
  pages,
  tabBar,
  globalStyle,
  uniIdRouter
};
const obj2strStyle = (obj) => {
  let style = "";
  for (let key in obj) {
    style += `${key}:${obj[key]};`;
  }
  return style;
};
const padFirstSymbol = (str, smb) => {
  if (str.startsWith(smb) || str.startsWith("http")) {
    return str;
  }
  return `/${str}`;
};
const replaceTabbarList = (list) => {
  if (!list.length > 0) {
    return [];
  }
  return list.map((item) => {
    if (item.iconPath) {
      item.iconPath = padFirstSymbol(item.iconPath, "/");
    }
    if (item.pagePath) {
      item.pagePath = padFirstSymbol(item.pagePath, "/");
    }
    if (item.selectedIconPath) {
      item.selectedIconPath = padFirstSymbol(item.selectedIconPath, "/");
    }
    return item;
  });
};
const setTabbarStorage = (key, value, name) => {
  try {
    common_vendor.index.setStorageSync(`mTab_${key}_${name}`, value);
  } catch (e) {
    console.error(e);
  }
};
const getTabbarStorage = (key, name) => {
  try {
    const value = common_vendor.index.getStorageSync(`mTab_${key}_${name}`);
    if (value) {
      return value;
    }
    return "";
  } catch (e) {
    console.error(e);
  }
};
const _sfc_main = {
  emits: ["change", "click"],
  props: {
    // 使用原生配置自动生成
    native: {
      type: Boolean,
      default: false
    },
    // 当前选择下标，默认0开始
    current: {
      type: [Number, String],
      default: 0
    },
    // tabbar配置项
    tabbar: {
      type: Object,
      default() {
        return {};
      }
    },
    // 是否固定在底部
    fixed: {
      type: Boolean,
      default: false
    },
    // 是否自动填充底部
    fill: {
      type: Boolean,
      default: false
    },
    // 显示层级
    zIndex: {
      type: [Number, String],
      default: 9999
    },
    // 是否自动规避底部安全距离
    safeBottom: {
      type: Boolean,
      default: true
    },
    // 切换时拦截事件(有兼容性，部分平台不支持)
    beforeChange: {
      type: Function,
      default: null
    },
    // 自定义tabbar高度，单位rpx
    tabbarHeight: {
      type: [Number, String],
      default: 100
    },
    // 自定义tabbar的name,方便读取默认tabbar
    name: {
      type: String,
      default: "custom"
    }
  },
  data() {
    return {
      isShowTabBar: false,
      //是否显示导航
      currentIndex: 0,
      //当前值
      beforeData: {},
      //切换前值
      initTabbarConfig: {},
      isReload: false
      //uni不支持computed的get set，使用reload无感重置刷新
    };
  },
  watch: {
    current(val) {
      this.currentIndex = val * 1;
    }
  },
  computed: {
    tabbarConfig() {
      const {
        isReload,
        native,
        initTabbarConfig: tabbar
      } = this;
      if (native) {
        if (!tabbar) {
          console.error("Native mode, Pages.json no tabbar config");
          return {
            borderStyle: "black",
            list: []
          };
        }
        return tabbar;
      }
      if (!tabbar.color) {
        return this._getDefaultTabbar();
      }
      return tabbar;
    },
    tabbarList() {
      const {
        isReload,
        tabbarConfig: {
          list
        }
      } = this;
      if (!list) {
        console.error("No tabbar config");
        return [];
      }
      return replaceTabbarList(list);
    },
    borderStyle() {
      const {
        isReload,
        borderStyle
      } = this.tabbarConfig;
      return borderStyle;
    },
    tabbarBoxStyle() {
      const {
        isReload,
        zIndex
      } = this;
      return obj2strStyle({
        "z-index": zIndex
      });
    },
    tabbarFillStyle() {
      const {
        isReload,
        tabbarHeight
      } = this;
      return obj2strStyle({
        "height": `${tabbarHeight}rpx`
      });
    },
    tabbarStyle() {
      const {
        isReload,
        tabbarHeight,
        tabbarConfig: {
          backgroundColor
        }
      } = this;
      return obj2strStyle({
        "height": `${tabbarHeight}rpx`,
        "background-color": backgroundColor || "#fff"
      });
    },
    tabbarItemStyle() {
      const {
        isReload,
        currentIndex,
        tabbarConfig: {
          color,
          selectedColor
        }
      } = this;
      return obj2strStyle({
        "color": currentIndex ? selectedColor : color
      });
    }
  },
  created() {
    const {
      tabbar,
      native
    } = this;
    const pageTabbar = PageConfig.tabBar;
    this.initTabbarConfig = native ? pageTabbar : tabbar;
    console.log(this.name);
    this._initTabbar();
  },
  methods: {
    _initTabbar() {
      const {
        current,
        fill,
        native,
        tabbarList
      } = this;
      this.currentIndex = current * 1;
      if (native && tabbarList.length > 0) {
        const currentPage = `/${getCurrentPages()[0].route}`;
        const currentIndex = tabbarList.findIndex((item) => item.pagePath === currentPage);
        this.currentIndex = currentIndex;
      }
      setTimeout(() => {
        this.isShowTabBar = true;
      });
      this._setTabbarStorage("tabbarConfig");
    },
    _setTabbarStorage(key) {
      setTabbarStorage(key, this.tabbarConfig, this.name);
      this._setReload();
    },
    _getDefaultTabbar() {
      return getTabbarStorage("tabbarConfig", this.name);
    },
    _checkMaxIndex(index) {
      const {
        tabbarConfig: {
          list
        }
      } = this;
      if (list.length < 1) {
        return false;
      }
      if (!list[index]) {
        console.error("Max tabbar index");
        return false;
      }
      return true;
    },
    _setReload() {
      this.isReload = true;
      setTimeout(() => {
        this.isReload = false;
      });
    },
    setTabBarBadge(obj) {
      const {
        index,
        text
      } = obj;
      if (this._checkMaxIndex(index)) {
        this.tabbarConfig.list[index].dot = text;
        this._setTabbarStorage("tabbarConfig");
      }
    },
    setTabBarItem(obj) {
      const {
        index,
        text,
        pagePath: newPagePath,
        iconPath,
        selectedIconPath
      } = obj;
      const {
        pagePath: oldPagePath
      } = this.tabbarConfig.list[index];
      if (this._checkMaxIndex(index)) {
        this.tabbarConfig.list[index] = {
          pagePath: newPagePath ? newPagePath : oldPagePath,
          text,
          iconPath,
          selectedIconPath
        };
        this._setTabbarStorage("tabbarConfig");
      }
    },
    showTabBar() {
      this.isShowTabBar = true;
    },
    hideTabBar() {
      this.isShowTabBar = false;
    },
    reload() {
      this.initTabbarConfig = this._getDefaultTabbar();
    },
    _tabChange(index) {
      const {
        currentIndex
      } = this;
      this.$emit("click", index);
      if (index === currentIndex) {
        return;
      }
      this.beforeData = {
        newIndex: index,
        oldIndex: currentIndex,
        next: this.jumpPage
      };
      if (this.beforeChange) {
        this.beforeChange(this._jumpPage, index);
      } else {
        this._jumpPage();
      }
    },
    _jumpPage() {
      const {
        native,
        beforeData: {
          newIndex: index
        },
        tabbarList: list
      } = this;
      const {
        pagePath: url,
        openType
      } = list[index];
      if (url) {
        if (native) {
          common_vendor.index.switchTab({
            url
          });
        } else {
          if (openType !== "navigate") {
            this.currentIndex = index;
          }
          switch (openType) {
            case "navigate":
              common_vendor.index.navigateTo({
                url
              });
              break;
            case "redirect":
              common_vendor.index.redirectTo({
                url
              });
              break;
            case "reLaunch":
              common_vendor.index.reLaunch({
                url
              });
              break;
            case "switchTab":
              common_vendor.index.switchTab({
                url
              });
              break;
            case "navigateBack":
              common_vendor.index.navigateBack({
                delta: 1
              });
              break;
            default:
              common_vendor.index.reLaunch({
                url
              });
          }
        }
      }
      this.$emit("change", index);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isShowTabBar
  }, $data.isShowTabBar ? common_vendor.e({
    b: $props.fill || $props.native
  }, $props.fill || $props.native ? {
    c: $props.safeBottom || $props.native ? 1 : "",
    d: common_vendor.s($options.tabbarFillStyle)
  } : {}, {
    e: $options.borderStyle === "black"
  }, $options.borderStyle === "black" ? {} : {}, {
    f: common_vendor.f($options.tabbarList, (item, index, i0) => {
      return common_vendor.e({
        a: item.bulge
      }, item.bulge ? {} : common_vendor.e({
        b: item.dot
      }, item.dot ? {
        c: common_vendor.t(item.dot)
      } : {}, {
        d: $data.currentIndex === index ? item.selectedIconPath : item.iconPath,
        e: common_vendor.t(item.text),
        f: index === $data.currentIndex ? $options.tabbarConfig.selectedColor : $options.tabbarConfig.color
      }), {
        g: common_vendor.o(($event) => $options._tabChange(index), index),
        h: index,
        i: index === $data.currentIndex ? 1 : ""
      });
    }),
    g: $props.fixed || $props.native ? 1 : "",
    h: $props.safeBottom || $props.native ? 1 : "",
    i: common_vendor.s($options.tabbarStyle),
    j: common_vendor.s($options.tabbarBoxStyle)
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d180004d"]]);
wx.createComponent(Component);
