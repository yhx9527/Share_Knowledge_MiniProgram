import wepy from 'wepy'

const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
}
var auth = wx.getStorageSync('Authorization')
class Request {
  errorhandle(data) {
    var that = this
    switch (data.statusCode) {
      case 400:
        wx.showModal({
          title: '提示',
          content: data.data.message,
          success: function (res) {
          }
        })
        break
      case 401:
        wx.showModal({
          title: '提示',
          content: '您的状态已过期,是否重新申请？',
          success: function (res) {
            if (res.confirm) {
              that.saveStatus()
            }
          }
        })
        break
      case 403:
        wx.showToast({
          title: '无权访问',
          icon: 'none'
        })
        break
      case 404:
        wx.showToast({
          title: '无效请求',
          icon: 'none'
        })
        console.log(404)
        break
      case 500:
        wx.showToast({
          title: '服务器错误',
          icon: 'none'
        })
        break
      case 502:
        wx.showToast({
          title: '服务器升级中...',
          icon: 'none'
        })
        break
    }
  }

  constructor() {
    this._header = {
      token: null,
      'Content-Type': 'application/json',
      'Authorization': auth
    }
    this._baseUrl = 'https://api.sharing-knowledge.club/'
  }

  request(params) {
    const { url, method, header, data } = params

    return wepy.request({
      url: (this._baseUrl || '') + url,
      method: method || METHOD.GET,
      data: data,
      header: {
        ...this._header,
        ...header
      }
    }).then(data => {
      return new Promise((resolve, reject) => {
        if ((data.statusCode === 200 && data.statusCode < 300) || data.statusCode === 304) {
          resolve(data.data)
        } else {
          this.errorhandle(data)
          reject(data)
        }
      })
    })
  }
  get(url, data, header = this._header) {
    return this.request({ url, method: METHOD.GET, header, data })
  }
  post(url, data, header = this._header) {
    return this.request({ url, method: METHOD.POST, header, data })
  }
  put(url, data, header = this._header) {
    return this.request({ url, method: METHOD.PUT, header, data })
  }
  delete(url, data, header = this._header) {
    return this.request({ url, method: METHOD.DELETE, header, data })
  }
  patch(url, data, header = this._header) {
    return this.request({ url, method: METHOD.PATCH, header, data })
  }
  set header(header) {
    this._header = header
  }
  get header() {
    return this._header
  }
  // token维持
  saveStatus() {
    var that = this
    wx.login({
      success(res) {
        if (res.code) {
          let userInfo = wx.getStorageSync('userInfo')
          that.post('tokens/' + res.code, userInfo)
            .then(data => {
              wx.showToast({title: '请继续使用'})
              that.header = {'Authorization': 'Bearer ' + data.data.accessToken}
              wx.setStorageSync('ksUser', data.data.ksUser)
            })
            .catch(data => {
              wx.showToast({title: '状态申请失败', icon: 'none'})
            })
        }
      }
    })
  }
}
export default new Request()
