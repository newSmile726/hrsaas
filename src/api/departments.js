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
    method: 'DELETE'
  })
}
/**
 * 新增部门
 * @param {Object} body 新增的部门参数
 * @returns  promise
 */
export const AddDeptsApi = (data) => {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
/**
 * 编辑部门
 * @param {String} id  部门id
 * @returns  promise
 */
export const getDeptByIdApi = (id) => {
  return request({
    url: '/company/department/' + id
  })
}

/**
 * 根据id修改部门信息
 * @param {Object} data 部门信息
 * @returns  promise
 */
export const getEditDeptsApi = (data) => {
  return request({
    url: '/company/department/' + data.id,
    method: 'PUT',
    data
  })
}
