import request from '@/utils/request'
/**
 * 获取 企业部门列表
 * @returns promise
 */
export const getDeptsApi = () => {
  return request({
    url: '/company/department'
  })
}
/**
 * 删除部门
 * @param {string} id 要删除的部门id
 * @returns  promise
 */
export const delDeptsApi = (id) => {
  return request({
    url: '/company/department/' + id,
    method:'DELETE'
  })
}
