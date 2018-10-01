/**
 * request 拦截器
 * 可以全局拦截请求参数
 */
export function request(params) {
  return params
}

/**
 * response 拦截器
 * 可以全局拦截请求返回结果
 */
export function response(res) {
  let code = res.statusCode
  if ((code === 200 && code < 300) || code === 304) {
    res = res.data
    if (!res.err_code) {
      return res
    } else {
      return Promise.reject(res)
    }
  } else if (code === 401) {
    console.log('未认证')
    return Promise.reject(res)
  } else {
    return Promise.reject(res)
  }
}
