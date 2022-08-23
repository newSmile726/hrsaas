import Layout from '@/layout'
export default {
  path: '/permission',
  component: Layout,
  meta: { id: 'permissions' },
  children: [
    {
      path: '',
      name:'permission',
      component: () => import('@/views/permission'),
      meta: { title: 'permission', icon: 'lock' }
    }
  ]
}
