import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  meta: { id: 'employees' },
  children: [
    {
      path: '',
      name:'employees',
      component: () => import('@/views/employees'),
      meta: { title: 'employees', icon: 'people' }
    },
    {
      path: 'detail/:id',
      component: () => import('@/views/employees/detail'),
      hidden: true
    },
    {
      path: 'print/:id',
      component: () => import('@/views/employees/print'),
      hidden: true
    }
  ]
}
