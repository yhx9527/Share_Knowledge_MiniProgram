import request from './request'

class Apis {
  constructor () {
    this._request = request
    this._header = request.header
  }
  /**
   * uesr-controller请求
   */
  postcode (code, wxUserInfo) {
    return this._request.post('tokens/' + code, wxUserInfo)
  }
}
export default new Apis()
