// 判断小程序是否存在上一页
export const hasPreviousPage = () => {
  const currentPage = getCurrentPages()[getCurrentPages().length - 1].route;
  let hasPreviousPage = false;
  if (getCurrentPages().length > 1) {
    const previousPage = getCurrentPages()[getCurrentPages().length - 2].route;
    if (previousPage !== currentPage) {
      hasPreviousPage = true;
    }
  }
  return hasPreviousPage;
};

// 手机号码模糊处理
export const maskPhoneNumber = (phoneNumber) => {
  return `${phoneNumber}`.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
};

/** 数字保留2位切不进行四舍五入 */
export const truncateToTwoDecimalPlaces =(num) =>{
  const str = num.toString();
  const dotIndex = str.indexOf('.');
  // 如果没有小数部分或者小数部分已经少于或等于两位，则直接返回
  if (dotIndex === -1 || dotIndex + 3 > str.length) {
    return num;
  }
  // 截断到两位小数
  return parseFloat(str.substring(0, dotIndex + 3));
}