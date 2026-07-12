import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: () => import('../views/HomeView.vue') },
    { path: '/products', name: 'Products', component: () => import('../views/ProductsView.vue') },
    { path: '/products/:id', name: 'ProductDetail', component: () => import('../views/ProductDetailView.vue'), props: true },
    { path: '/about', name: 'About', component: () => import('../views/AboutView.vue') },
    { path: '/contact', name: 'Contact', component: () => import('../views/ContactView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
