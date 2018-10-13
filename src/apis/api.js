import request from './request'

class Apis {
  constructor () {
    this._request = request
    this._header = request.header
  }
  set header(header) {
    request.header = header
  }
  get header() {
    return request.header
  }
  /**
   * uesr-controller
   */
  // 获取token
  postcode (code, wxUserInfo) {
    return this._request.post('tokens/' + code, wxUserInfo)
  }
  // 修改个人信息
  putuser (kuId, mUser) {
    return this._request.put('users/' + kuId, mUser)
  }
  // 获取用户信息
  getuser (kuId) {
    return this._request.get('users/' + kuId)
  }
  /**
   * subject-controller
   */
  // 获取主题
  getsubject (page = 1, isAuthor = false, pageSize = 10) {
    return this._request.get('subjects', {isAuthor: isAuthor, page: page, pageSize: pageSize})
  }
  // 发起主题
  postsubject (ksSubject) {
    return this._request.post('subjects', ksSubject)
  }
  // 获取主题详情
  getsubjectmore (ksId) {
    return this._request.get('subjects/' + ksId)
  }
  // 修改主题详情
  putsubjectmore (ksId, ksSubject) {
    return this._request.put('subjects/' + ksId, ksSubject)
  }
  // 删除主题
  deletesubject (ksId) {
    return this._request.delete('subjects/' + ksId)
  }
  // 结束主题(开展完毕)
  patchsubject (ksId) {
    return this._request.patch('subjects/' + ksId)
  }

  /**
   * partake-controller
   */
  // 我的参与
  getparty (page = 1, pageSize = 10) {
    return this._request.get('participations', {page: page, pageSize: pageSize})
  }
  // 申请参与
  postparty(ksId) {
    return this._request.post('subjects/' + ksId + '/participations')
  }
  // 主讲人审查参与
  putparty(ksId, kpId, status = true) {
    return this._request.put('subjects/' + ksId + '/participations' + kpId, {status: status})
  }
  // 删除参与
  deleteparty(ksId, kpId) {
    return this._request.delete('subjects/' + ksId + '/participations/' + kpId)
  }
  // 获取我的报名
  getsign(page = 1, pageSize = 10) {
    return this._request.get('enrollments/', {page: page, pageSize: pageSize})
  }
  // 报名
  postsign(ksId) {
    return this._request.post('subjects/' + ksId + '/enrollments')
  }
  // 删除报名
  deletesign(ksId, keId) {
    return this._request.delete('subjects/' + ksId + '/enrollments/' + keId)
  }

  /**
   * comment-controller
   */
  // 获取评论
  getcomments(ksId, page = 1, pageSize = 20) {
    return this._request.get('subjects/' + ksId + '/comments', {page: page, pageSize: pageSize})
  }
  // 发布评论内容
  postcomments(ksId, content) {
    let header = request.header
    header['Content-Type'] = 'application/x-www-form-urlencoded'
    return this._request.post('subjects/' + ksId + '/comments', {content: content})
  }
  // 主题人修改评论状态
  putcomments(ksId, kcId, ksComment) {
    return this._request.put('subjects/' + ksId + '/comments' + kcId, {ksComment: ksComment})
  }

  /**
   * business-controller
   */
  // 获取商家列表
  getbusiness(page = 1, pageSize = 10) {
    return this._request.get('businesses', {page: page, pageSize: pageSize})
  }

  /**
   * dict-controller
   */
  // 获取字典值
  getdictcode(type) {
    return this._request.get('dictionaries/' + type)
  }
}
export default new Apis()
