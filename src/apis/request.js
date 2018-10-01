import wepy from 'wepy'

const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
}
class Request {
  errorhandle(data) {
    switch (data.statusCode) {
      case 401:
        break
      case 403:
        break
      case 404:
        console.log(404)
        break
      case 500:
        break
      case 502:
        break
    }
  }

  constructor() {
    this._header = {
      token: null,
      'Content-Type': 'application/json',
      'Authorization': null
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
          reject(data)
          this.errorhandle(data)
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
    return this.request({ url, method: METHOD.patch, header, data })
  }
  set header(header) {
    this._header = header
  }
  get header() {
    return this._header
  }
}
export default new Request()
