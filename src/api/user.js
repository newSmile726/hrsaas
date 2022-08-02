import request from '@/utils/request'
/**
 * 请求登录
 * @param {Object} data mobile password
 * @returns promise
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
/**
 * 获取用户信息
 * @returns promise
 */
export function settUserInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
/**
 * 根据 用户id获取详细信息
 * @param {string} id 用户id
 * @returns  promise
 */
export function setUserDatilApi(id) {
  return request({
    url: '/sys/user/' + id
  })
}
