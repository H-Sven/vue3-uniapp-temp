let reque;

// 请求失败
const requestFailedToast = (text = '服务器又开小差了，请稍后再试') => {
  wx.showToast({
    title: text,
    icon: 'none',
    duration: 2000,
  });
};

let time_tologin = 0;
// 用户登录信息验证失败
const authenticationFailed = () => {
  clearTimeout(time_tologin);
  time_tologin = setTimeout(() => {
    wx.clearStorageSync();
    wx.reLaunch({ url: '/pages/index' });
  }, 1500);
};

const baseRequest = ({ url = '', payload = {}, header = {}, method = 'GET' }) => {
  return new Promise((resolve, reject) => {
    wx.showNavigationBarLoading();
    header.Authorization = `${wx.getStorageSync('token') || ''}`;
    reque = wx.request({
      url: `${url}`,
      data: payload,
      header,
      method,
      responseType: 'text',
      success: (res) => {
        if (res.statusCode === 200) {
          if (res.data.code === 4002) {
            requestFailedToast('此用户已注销，请重新注册登录');
            authenticationFailed();
          } else {
            resolve(res.data);
          }
        } else {
          if (res.statusCode === 401) {
            requestFailedToast('登录信息已过期，请重新登录');
            authenticationFailed();
          } else {
            requestFailedToast();
          }
          reject(res);
        }
      },
      fail: (res) => {
        if (res.errMsg != 'request:fail abort'){
          requestFailedToast();
        }
        reject(res);
      },
      complete: () => {
        wx.hideNavigationBarLoading();
      },
    });
  });
};

/**
 * @param {*} config request函数的参数，codeIgnore: 是否需要忽略 res.code 的处理
 * @returns
 */
const request = (config = {}) => {
  return baseRequest({
    ...config,
    url: config.url,
  }).then((res) => {
    // 配置 codeIgnore 为true，则不处理接口反馈code，并返回完整响应体
    if (config.codeIgnore) {
      return res;
    }
    // 响应体 code 为 1000 时，表示处理正常，返回 响应体中的 data
    if (res.code === 1000) {
      return res.data;
    } else {
      requestFailedToast(res.msg);
      throw new Error(`${res.code}: ${res.msg}`);
    }
  });
};

export { baseRequest, request };
