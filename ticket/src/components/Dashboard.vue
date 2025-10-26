<script setup>
import logo from '../assets/fixMate-logo-transparent.png'
</script>
<template>
  <div class="dashboard">
    <header class='navbar navbar-expand-lg'>
      <div class='container d-flex justify-content-between align-items-center w-100'>
        <div class='logo'>
          <img :src="logo" alt="FixMate Logo" />
        </div>
        <div><p>Welcome, {{ userName }}</p></div>
        <div class='d-flex gap-3'>
          <button class='coloured-btn' @click="navigateTo('/tickets')">View all your tickets</button>
          <button class='logout rounded-3' @click="handleLogout">
            <i class="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </div>
      </div>
    </header>

    <main class='tickets d-flex align-items-center justify-content-center'>
      <div class='container'>
        <div class='row gap-3 py-4 align-items-center justify-content-center'>
          <div v-for="(stat, index) in summary" :key="index" class='card-hover col-sm-12 col-md-3 d-flex justify-content-center p-4 align-items-start border-0 gap-2 card shadow-lg rounded-4'>
            <div class='stat-icon text-white p-2 d-flex justify-content-center align-items-center' :style="{backgroundColor: stat.color, fontSize:'1.5rem'}" v-html="stat.icon"></div>
            <div class='lead'>{{ stat.title }}</div>
            <div class='fs-5 fw-bold' :style="{color: stat.color}">{{ stat.no }}</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  props:['displayToast','onLogout'],
  setup(props){
    const router = useRouter();
    const navigateTo=(path)=>router.push(path);
    const tickets = ref([]);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const user = currentUser?.uname || '';
    const userName = user.split(' ')[0];

    const totalTickets = ref(0);
    const openTickets = ref(0);
    const inProgressTickets = ref(0);
    const resolvedTickets = ref(0);

    const summary = ref([]);

    const fetchTickets=async()=>{
      if(!currentUser) { navigateTo('/auth/login'); return; }
      try{
        const res = await axios.get(`https://68fdfc407c700772bb12762f.mockapi.io/ticket-management/users/${currentUser.id}`);
        tickets.value=res.data.tickets || [];
        totalTickets.value = tickets.value.length;
        openTickets.value = tickets.value.filter(t=>t.status?.toLowerCase()==="open").length;
        inProgressTickets.value = tickets.value.filter(t=>t.status?.toLowerCase()==="in progress").length;
        resolvedTickets.value = tickets.value.filter(t=>t.status?.toLowerCase()==="resolved").length;

        summary.value = [
          { icon:'<i class="fa-solid fa-ticket"></i>', title:"Total tickets", color:"blue", no: totalTickets.value },
          { icon:'<i class="fa-solid fa-circle-exclamation"></i>', title:"Open tickets", color:"green", no: openTickets.value },
          { icon:'<i class="fa-solid fa-spinner"></i>', title:"In progress", color:"orange", no: inProgressTickets.value },
          { icon:'<i class="fa-solid fa-circle-check"></i>', title:"Resolved", color:"grey", no: resolvedTickets.value },
        ];
      } catch(e){ props.displayToast("Failed to fetch tickets","error"); }
    }

    onMounted(()=>{ fetchTickets(); });

    const handleLogout=()=>{ props.displayToast("Logged out successfully","success"); props.onLogout(); setTimeout(()=>navigateTo("/"),1000); }

    return { userName, summary, navigateTo, handleLogout };
  }
}
</script>
