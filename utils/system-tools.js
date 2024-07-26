/**
 * 小程序系统信息处理的相关工具类
 */

export default class SystemTools {
  // 系统信息
  #sysInfo = null;
  // 胶囊布局位置信息
  #MenuButtonRect = null;
  // 移动设备匹配数组
  #MobileMatchArr = ['ios', 'android', 'devtools'];

  constructor() {
    // 页面头部导览栏布局位置信息
    this.pageNavRect;
    this.setPageNavRect({});
    // px转换到rpx的比例
    this.pxToRpxScale = 2;
    // 是否为移动设备
    this.isMobile = true;
  }
  init() {
    this.#sysInfo = uni.getSystemInfoSync();
    this.#MenuButtonRect = uni.getMenuButtonBoundingClientRect();

    this.isMobile = this.#MobileMatchArr.indexOf(this.#sysInfo.platform) > -1;
    this.pxToRpxScale = 750 / this.#sysInfo.windowWidth;
    this.calculatePageNavRect();
  }
  /**
   * 获取完整设备信息
   * @returns {object | null}
   */
  getSysInfo() {
    return this.#sysInfo;
  }
  /**
   * 获取胶囊布局位置信息
   * @returns {object | null}
   */
  getMenuButtonRect() {
    return this.#MenuButtonRect;
  }
  /**
   * 计算页面头部导览栏布局位置信息
   */
  calculatePageNavRect() {
    const SBH = this.#sysInfo.statusBarHeight; // 顶部状态栏高度
    const SYSW = this.#sysInfo.windowWidth; // 屏幕可用宽度
    const MBR = this.#MenuButtonRect.right; // 胶囊按钮的右边界坐标
    const MBH = this.#MenuButtonRect.height; // 胶囊按钮高度
    let MBT = this.#MenuButtonRect.top; // 胶囊的上边界坐标
    if (!this.isMobile) {
      // PC端，这个值有bug，手动修正
      MBT = 4;
    }

    const RECT = {
      // 上边距 —— 顶部状态栏高度
      top: SBH,
      // 左右两侧边距 —— 胶囊按钮与屏幕右侧的距离
      sides: SYSW - MBR,
      // 标准导航栏高度 —— 状态栏高度 + 胶囊按钮高度 + 2倍 胶囊按钮与状态栏的距离
      height: SBH + MBH + (MBT - SBH) * 2,
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
      top, // 上边距
      sides, // 左右两侧边距
      height, // 标准导航栏高度
      titleHeight: height - top, // 标题区域高度
    };
  }
}
