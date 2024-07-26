"use strict";
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _sysInfo, _MenuButtonRect, _MobileMatchArr;
const common_vendor = require("../common/vendor.js");
class SystemTools {
  constructor() {
    // 系统信息
    __privateAdd(this, _sysInfo, null);
    // 胶囊布局位置信息
    __privateAdd(this, _MenuButtonRect, null);
    // 移动设备匹配数组
    __privateAdd(this, _MobileMatchArr, ["ios", "android", "devtools"]);
    this.pageNavRect;
    this.setPageNavRect({});
    this.pxToRpxScale = 2;
    this.isMobile = true;
  }
  init() {
    __privateSet(this, _sysInfo, common_vendor.index.getSystemInfoSync());
    __privateSet(this, _MenuButtonRect, common_vendor.index.getMenuButtonBoundingClientRect());
    this.isMobile = __privateGet(this, _MobileMatchArr).indexOf(__privateGet(this, _sysInfo).platform) > -1;
    this.pxToRpxScale = 750 / __privateGet(this, _sysInfo).windowWidth;
    this.calculatePageNavRect();
  }
  /**
   * 获取完整设备信息
   * @returns {object | null}
   */
  getSysInfo() {
    return __privateGet(this, _sysInfo);
  }
  /**
   * 获取胶囊布局位置信息
   * @returns {object | null}
   */
  getMenuButtonRect() {
    return __privateGet(this, _MenuButtonRect);
  }
  /**
   * 计算页面头部导览栏布局位置信息
   */
  calculatePageNavRect() {
    const SBH = __privateGet(this, _sysInfo).statusBarHeight;
    const SYSW = __privateGet(this, _sysInfo).windowWidth;
    const MBR = __privateGet(this, _MenuButtonRect).right;
    const MBH = __privateGet(this, _MenuButtonRect).height;
    let MBT = __privateGet(this, _MenuButtonRect).top;
    if (!this.isMobile) {
      MBT = 4;
    }
    const RECT = {
      // 上边距 —— 顶部状态栏高度
      top: SBH,
      // 左右两侧边距 —— 胶囊按钮与屏幕右侧的距离
      sides: SYSW - MBR,
      // 标准导航栏高度 —— 状态栏高度 + 胶囊按钮高度 + 2倍 胶囊按钮与状态栏的距离
      height: SBH + MBH + (MBT - SBH) * 2
    };
    this.setPageNavRect(RECT);
  }
  /**
   * 设置页面头部导览栏布局位置信息
   * @param {object} option
   * @param {number} option.top
   * @param {number} option.sides
   * @param {number} option.height
   * @returns
   */
  setPageNavRect({ top = 44, sides = 7, height = 84 }) {
    this.pageNavRect = {
      top,
      // 上边距
      sides,
      // 左右两侧边距
      height,
      // 标准导航栏高度
      titleHeight: height - top
      // 标题区域高度
    };
  }
}
_sysInfo = new WeakMap();
_MenuButtonRect = new WeakMap();
_MobileMatchArr = new WeakMap();
exports.SystemTools = SystemTools;
