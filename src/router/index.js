import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView')
  },
  {
    path: '/edit/:name/:question/:photo',
    name: 'edit',
    component: () => import('@/views/EditView')
  },
  {
    path: '/video/:name/:question/:photo',
    name: 'video',
    component: () => import('@/views/VideoView')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
