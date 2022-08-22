import request from '@/utils/request'
/**
 *  获取权限列表
 * @returns  promise
 */
export function getPermissionList() {
  return request({
    url: '/sys/permission'
  })
}
/**
 * 新增权限
 * @param {*} data  新增权限需要的数据
 * @returns  promise
 */
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}
