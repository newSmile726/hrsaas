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
