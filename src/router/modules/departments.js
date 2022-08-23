import Layout from '@/layout'
export default {
  path: '/departments',
  component: Layout,
  meta: { id: 'departments' },
  children: [
    {
      path: '',
      name:'departments',
      component: () => import('@/views/departments'),
      meta: { title: 'departments', icon: 'tree' }
    }
  ]
}
