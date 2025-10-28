<template>
  <div class="dashboard">
    <header class='navbar navbar-expand-lg'>
        <div class='container'>
          <div class='d-flex justify-content-between align-items-center w-100'>
            <div class='logo'>
              <img src='/src/assets/fixMate-logo-transparent.png' alt="FixMate Logo"/>
            </div>
            <div>
              <p>Welcome, {{ userName }}</p>
            </div>
            <div class='d-flex gap-3'>
              <button class='coloured-btn' @click="goTickets">View all your tickets</button>
              <button class='logout rounded-3' @click="logout">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <main class="tickets d-flex align-items-center justify-content-center">
        <div class="container">
          <div class="row gap-3 py-4 align-items-center justify-content-center">
              <div v-for="(stat, index) in summary" :key="index" class="card-hover col-sm-12 col-md-3 d-flex justify-content-center p-4 align-items-start border-0 gap-2 card shadow-lg rounded-4">
                <div class="stat-icon text-white p-2 d-flex justify-content-center align-items-center" :style="{ backgroundColor: stat.color, fontSize: '1.5rem' }">
                  <i :class="stat.icon"></i>
                </div>
                <div class="lead">{{ stat.title }}</div>
                <div class="fs-5 fw-bold" :style="{ color: stat.color }">{{ stat.no }}</div>
              </div>
          </div>
        </div>
      </main>
    <Footer />
  </div>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import Footer from '../components/Footer.vue'
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  components: { Navigation, Footer },
  setup(){
    const router = useRouter()
    const userSession = reactive(JSON.parse(localStorage.getItem('ticketapp_session')||'[]'))
    const tickets = userSession.tickets

    const countStatus = (status) => tickets.filter(t=>t.status===status).length
    const goTickets = ()=> router.push('/tickets')

    const totalTickets = tickets.length
    const openTickets = countStatus('Open')
    const inProgressTickets = countStatus('In Progress')
    const resolvedTickets = countStatus('Resolved')

    const summary = computed(() => [
      { icon: "fa-solid fa-ticket", title: "Total tickets", color: "blue", no: totalTickets },
      { icon: "fa-solid fa-circle-exclamation", title: "Open tickets", color: "green", no: openTickets },
      { icon: "fa-solid fa-spinner", title: "In progress", color: "orange", no: inProgressTickets },
      { icon: "fa-solid fa-circle-check", title: "Resolved", color: "grey", no: resolvedTickets },
    ])
    const session = JSON.parse(localStorage.getItem('ticketapp_session') || '{}')
    const filteredName = session?.uname.split(" ")[0]

    const userName = filteredName || 'User'

    const logout = ()=>{
      localStorage.removeItem('loggedin_user')
      router.push('/auth/login')
    }

    return { tickets, countStatus, goTickets, logout, summary, userName }
  }
}
</script>
