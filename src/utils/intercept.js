var aop = {
  // 是否授予用户信息
  isPass () {
    // 查看是否授权
    return new Promise((resolve, reject) => {
      /* wx.getSetting({
        success: function(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                wx.setStorageSync('userInfo', res.userInfo)
              }
            })
            resolve(true)
          } else {
            resolve(false)
          }
        }
      }) */
      wx.getUserInfo({
        success: function (res) {
          wx.setStorageSync('userInfo', res.userInfo)
          resolve(true)
        },
        fail: function () {
          resolve(false)
        }
      })
    })
  },
  getUserInfo () {
    // 返回用户数据
    return new Promise((resolve, reject) => {
      /* wx.getSetting({
        success: function(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                wx.setStorageSync('userInfo', res.userInfo)
                resolve(res.userInfo)
              }
            })
          } else {
            resolve('')
          }
        }
      }) */
      wx.getUserInfo({
        success: function (res) {
          wx.setStorageSync('userInfo', res.userInfo)
          resolve(res.userInfo)
        },
        fail: function () {
          resolve('')
        }
      })
    })
  },
  before (func, this_obj, ...args) {
    var that = this
    that.isPass()
      .then(data => {
        if (data) {
          func.apply(this_obj, args)
        } else {
          wx.showModal({
            title: '提示',
            content: '请您先前往授权',
            success: function(res) {
              if (res.confirm) {
                wx.navigateTo({url: '/pages/login'})
              }
            }
          })
        }
      })
  }
}
module.exports = aop
