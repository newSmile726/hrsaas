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
/**
 * 根据角色id获取角色详情
 * @param {*} id 角色id
 * @returns  promise
 */
export const getRolesInfo = (id) => {
  return request({
    url: '/sys/role/' + id
  })
}
/**
 * 给角色分配权限
 * @param {*} data  {id,permIds}
 * @returns  promise
 */
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}