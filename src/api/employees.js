import request from '@/utils/request'
/**
 * 获取员工列表（简单）
 * @returns promise
 */
export const getEmployeesListApi = () => {
  return request({
    url: '/sys/user/simple'
  })
}
/**
 * 获取员工列表
 * @param {Object} params  {page,size}
 * @returns  promise
 */
export const getEmployeesApi = (params) => {
  return request({
    url: '/sys/user',
    params
  })
}
