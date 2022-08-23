import Layout from '@/layout'
export default {
  path: '/social',
  component: Layout,
  meta: { id: 'social_securitys' },
  children: [
    {
      path: '',
      name:'social',
      component: () => import('@/views/social'),
      meta: { title: 'social', icon: 'table' }
    }
  ]
}
