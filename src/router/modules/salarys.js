import Layout from '@/layout'
export default {
  path: '/salarys',
  component: Layout,
  meta: { id: 'salarys' },
  children: [
    {
      path: '',
      name:'salarys',
      component: () => import('@/views/salarys'),
      meta: { title: 'salarys', icon: 'money' }
    }
  ]
}
