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

/**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}
/**
 * 批量导入员工
 * @param {*} data 员工数组
 * @returns  promise
 */
export function importMapKeyPathApi(data) {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}
