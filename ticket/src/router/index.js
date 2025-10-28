import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import AuthPage from '../views/AuthPage.vue'
import Dashboard from '../views/Dashboard.vue'
import TicketManagement from '../views/TicketManagement.vue'

const isAuthenticated = () => !!localStorage.getItem('ticketapp_session')

const routes = [
  { path: '/', component: LandingPage, },
  { path: '/auth/login', component: AuthPage, props: { mode: 'login' } },
  { path: '/auth/signup', component: AuthPage, props: { mode: 'signup' } },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/tickets', component: TicketManagement, meta: { requiresAuth: true } },
  { path: '/:catchAll(.*)', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/auth/login')
  } else {
    next()
  }
})

export default router
