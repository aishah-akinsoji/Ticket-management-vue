<script setup>
import logo from '../assets/fixMate-logo-transparent.png'
</script>
<template>
  <div class="ticket-management">
    <header class='navbar navbar-expand-lg'>
      <div class='container d-flex justify-content-between align-items-center w-100'>
        <div class='logo'><img :src="logo" alt="FixMate Logo" /></div>
        <div class='d-flex gap-3'>
          <button class='coloured-btn' @click="navigateTo('/dashboard')">Go to Dashboard</button>
          <button class='logout rounded-3' @click="handleLogout"><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
        </div>
      </div>
    </header>

    <main class='tickets d-flex justify-content-center'>
      <div class='container d-flex flex-column align-items-center gap-3'>
        <button class="coloured-btn" @click="modalOpen=true"><i class="fa-solid fa-plus"></i> Create a new ticket</button>

        <div v-if="tickets.length===0" class="no-tickets d-flex flex-column justify-content-center align-items-center h1 mt-4">
          <i class="fa-solid fa-ticket"></i><p>No tickets available</p>
        </div>

        <div v-else class='row gap-3 py-4 align-items-center justify-content-center w-100'>
          <div v-for="ticket in tickets" :key="ticket.id" class='col-sm-12 col-md-4 border-0 card p-3 shadow-lg rounded-4 d-flex flex-column gap-2'>
            <div class='d-flex justify-content-between align-items-center'>
              <h5>{{ ticket.title }}</h5>
              <div class="d-flex gap-2">
                <button class="ticket-btn" @click="handleEditClick(ticket)"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="ticket-btn" @click="handleSelected(ticket.id)"><i class="fa-solid fa-trash"></i></button>
              </div>
            </div>
            <p>{{ ticket.description }}</p>
            <div class='d-flex justify-content-between'>
              <span class="ticket-status p-1 rounded-3" :style="{backgroundColor: statusColor(ticket.status)}">{{ ticket.status }}</span>
              <span class="ticket-priority p-1 rounded-3" :style="{backgroundColor: priorityColor(ticket.priority)}">{{ ticket.priority }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal and Delete Modal go here (same logic as React with ref variables) -->
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  props: ['displayToast','onLogout'],
  setup(props){
    const router=useRouter(); const navigateTo=(p)=>router.push(p);
    const tickets=ref([]); const modalOpen=ref(false);
    const ticketForm=ref({title:'',description:'',status:'Open',priority:'Medium'});
    const editingTicket=ref(null); const deletingTicket=ref(null); const deleteConfirmation=ref(false);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const fetchTickets=async()=>{
      if(!currentUser){ navigateTo("/auth/login"); return; }
      try{ const res=await axios.get(`https://68fdfc407c700772bb12762f.mockapi.io/ticket-management/users/${currentUser.id}`);
        tickets.value=res.data.tickets || [];
      } catch(e){ props.displayToast("Failed to fetch tickets","error"); }
    }

    onMounted(()=>fetchTickets());

    const handleLogout=()=>{ props.displayToast("Logged out successfully","success"); props.onLogout(); navigateTo("/"); }

    const handleEditClick=(ticket)=>{ editingTicket.value=ticket; ticketForm.value={...ticket}; modalOpen.value=true; }
    const handleSelected=(id)=>{ deletingTicket.value=tickets.value.find(t=>t.id===id); deleteConfirmation.value=true; }
    const statusColor=(status)=> status==="Open"?"rgba(0,109,0,0.36)":status==="In Progress"?"rgba(255,166,0,0.47)":"rgba(128,128,128,0.336)";
    const priorityColor=(p)=>p==="Low"?"rgba(131,139,131,0.36)":p==="Medium"?"rgba(0,119,255,0.47)":"rgba(255,0,0,0.34)";

    // handleFormSubmit and handleDelete same as React but using ref.value

    return { tickets, modalOpen, ticketForm, editingTicket, deletingTicket, deleteConfirmation, handleEditClick, handleSelected, handleLogout, navigateTo, statusColor, priorityColor };
  }
}
</script>
