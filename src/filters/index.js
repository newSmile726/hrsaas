import dayjs from 'dayjs'
//统一封装过滤器
export const formatTime = (val) => {
  return dayjs(val).format('YYYY-MM-DD')
}
