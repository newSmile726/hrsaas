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

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/**
 *  根据用户id获取员工详情数据
 * @param {*} id 用户id
 * @returns promise
 */
export const getUserDetail = (id) =>
  request({
    url: `/sys/user/${id}`
  })
/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}
