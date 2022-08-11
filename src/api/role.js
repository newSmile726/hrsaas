import request from '@/utils/request'

/**
 * 获取所有角色列表
 * @param {Object} params 每页的数据量
 * @returns  promise
 */
export const getRolesApi = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}
/**
 *  添加角色
 * @param {Object} data  角色信息
 * @returns  promise
 */
export const AddRolesApi = (data) => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
