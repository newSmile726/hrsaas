import Layout from '@/layout'
export default {
  path: '/setting',
  component: Layout,
  meta: { id: 'settings' },
  children: [
    {
      path: '',
      name:'setting',
      component: () => import('@/views/setting'),
      meta: { title: 'setting', icon: 'setting' }
    }
  ]
}
