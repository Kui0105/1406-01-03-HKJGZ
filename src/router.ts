import { createRouter, createWebHistory } from 'vue-router'
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'login', component: () => import('./components/LoginView.vue') },
    { path: '/login', name: 'login-alias', component: () => import('./components/LoginView.vue') },
    { path: '/dashboard', name: 'dashboard', component: () => import('./components/DashboardView.vue') },
  ],
})
