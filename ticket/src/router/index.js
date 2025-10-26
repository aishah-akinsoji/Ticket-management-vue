import { createRouter, createWebHistory } from "vue-router"

// Pages
import LandingPage from "../components/LandingPage.vue"
import AuthPage from "../components/AuthPage.vue"
import Dashboard from "../components/Dashboard.vue"
import TicketManagement from "../components/TicketManagement.vue"

const routes = [
  { path: "/", component: LandingPage },
  { path: "/auth/:mode", component: AuthPage, props: true },
  { path: "/dashboard", component: Dashboard },
  { path: "/tickets", component: TicketManagement },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
