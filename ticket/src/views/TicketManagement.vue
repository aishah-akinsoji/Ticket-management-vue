<template>
  <div class="ticket-management">
    <header class='navbar navbar-expand-lg'>
        <div class='container'>
          <div class='d-flex justify-content-between align-items-center w-100'>
            <div class='logo'>
              <img src='/src/assets/fixMate-logo-transparent.png' alt="FixMate Logo"/>
            </div>
            <div class='d-flex gap-3'>
              <button class='coloured-btn' type="button" @click="goDashboard">Go to Dashboard</button>
              <button class='logout rounded-3' type="button" @click="logout">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <main class='tickets d-flex justify-content-center'>
        <div class='container d-flex flex-column align-items-center gap-3'>
          <button class="coloured-btn" type="button" @click="openModal = true">
            <i class="fa-solid fa-plus"></i> Create a new ticket
          </button>
          
            <div v-if="tickets.length === 0" class="no-tickets d-flex flex-column justify-content-center align-items-center h1 mt-4">
              <i class="fa-solid fa-ticket"></i>
              <p>No tickets available</p>
            </div>
            <div v-else class='row gap-3 py-4 align-items-center justify-content-center w-100'>
                <div v-for="(ticket, index) in tickets" :key="index" class='col-sm-12 col-md-4 border-0 card p-3 shadow-lg rounded-4 d-flex flex-column gap-2'>
                  <div class='d-flex justify-content-between align-items-center'>
                    <h5>{{ticket.title}}</h5>
                    <div class="d-flex gap-2">
                      <button class="ticket-btn" @click="editTicket(ticket)"><i class="fa-solid fa-pen-to-square"></i></button>
                      <button class="ticket-btn" @click="confirmDelete(ticket)"><i class="fa-solid fa-trash"></i></button>
                    </div>
                  </div>
                  <p>{{ticket.description}}</p>
                  <div class="d-flex justify-content-between">
                    <span class="ticket-status p-1 rounded-3"
                          :style="{ backgroundColor: ticket.status === 'Open' ? 'rgba(0, 109, 0, 0.363)' : ticket.status === 'In Progress' ? 'rgba(255, 166, 0, 0.473)' : 'rgba(128, 128, 128, 0.336)' }">
                      {{ ticket.status }}
                    </span>
                    <span class="ticket-priority p-1 rounded-3"
                          :style="{ backgroundColor: ticket.priority === 'Low' ? 'rgba(128, 128, 128, 0.336)' : ticket.priority === 'Medium' ? 'rgba(255, 166, 0, 0.473)' : 'rgba(255, 0, 0, 0.34)' }">
                      {{ ticket.priority }}
                    </span>
                  </div>
                </div>
            </div>
        </div>
      </main>
      <div id="modalBox" class="modal-box-container" v-if="openModal">
        <div class="modal-box">
        <div class="modal-box-header">
            <div class="modal-box-title">
                <h1>{{ editingId !== null ? "Edit Ticket" : "Create new ticket" }}</h1>
                <p class="small fw-normal">Fill in the details below.</p>
            </div>
        </div>
        <div class="modal-box-body">
            <form class="d-flex flex-column gap-3" @submit.prevent="addOrEditTicket">
                <div class="title d-flex flex-column">
                <label for="title" class="fw-bold" required>Title *</label>
                <input id="title" type="text" v-model="ticketForm.title" placeholder="Title" required/>
                <span style="color: red;">{{ errors.title }}</span>
                </div>
                <div class="description d-flex flex-column">
                <label for="description" class="fw-bold">Description</label>
                <textarea id="description" v-model="ticketForm.description" placeholder="Description" maxLength= "2000"></textarea>
                <span style="color: red;"></span>
                <span class="password-rule">max: 2000</span>
                </div>
                <div class="status d-flex flex-column">
                <label class="fw-bold">Status *</label>
                <select v-model="ticketForm.status">
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                </select>
                </div>
                <div class="priority d-flex flex-column">
                <label class="fw-bold">Priority</label>
                <select v-model="ticketForm.priority">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                </div>
                <div class="modal-box-footer d-flex mt-3 gap-2">
                  <button @click="closeModal" type="button" class="coloured-btn bg-secondary">Close</button>
                  <button class="coloured-btn" type="submit" >
                      {{ editingId !== null ? "Update Ticket" : "Create Ticket" }}
                  </button>
              </div>
            </form>
        </div>
      </div>

      </div>
      <div class="modal-box-container" v-if="confirm.show">
        <div class="modal-box">
          <div class="modal-header p-0">
            <div class="modal-box-title">
              <h1>Delete Confirmation</h1>
              <p class="p-0">Do you want to delete this ticket</p>
            </div>
          </div>
          <hr/>
          <div class="modal-box-body">
            This action cannot be undone. This will permanentlydelete the ticket "{{ confirm.message }}"
          </div>
          <div class="modal-box-footer d-flex gap-2 mt-3">
            <button @click="confirm.show = false" class="coloured-btn bg-secondary">Close</button>
            <button class="delete-btn" @click="deleteTicket">
                Delete
            </button>
          </div>
        </div>
      </div>
    <Toast :message="toastMessage" :type="toastType"/>
    <Footer />
  </div>
</template>

<script>
  import Footer from '../components/Footer.vue'
  import Toast from '../components/Toast.vue'
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'

  export default {
    components: { Footer, Toast},
    setup() {
  const router = useRouter()
  const users = JSON.parse(localStorage.getItem('ticketapp_users')) || []
  const session = JSON.parse(localStorage.getItem('ticketapp_session')) || {}
  const tickets = reactive(session.tickets || [])
  const ticketForm = reactive({ title:'', description:'', status:'Open', priority:'Medium' })
  const errors = reactive({ title:'' })
  const toastMessage = ref('')
  const toastType = ref('success')
  const editingId = ref(null)
  const openModal = ref(false)
  const confirm = reactive({ show:false, message:'', ticket:null })

  const goDashboard = () => router.push('/dashboard')
  const logout = () => {
    localStorage.removeItem('loggedin_user')
    router.push('/auth/login')
  }

  const saveTickets = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedin_user'));
  const userIndex = users.findIndex(u => u.email === loggedInUser.email);

  if (userIndex !== -1) {
    users[userIndex].tickets = tickets;
    localStorage.setItem('ticketapp_users', JSON.stringify(users));
    const updatedUser = users[userIndex];
    localStorage.setItem('ticketapp_session', JSON.stringify(updatedUser));
    localStorage.setItem('loggedin_user', JSON.stringify(updatedUser));
  }
};


  const validate = () => {
    let valid = true
    errors.title = ''
    if (!ticketForm.title) {
      errors.title = 'Title required'
      valid = false
    }
    return valid
  }

  const addOrEditTicket = () => {
    if (!validate()) return

    if (editingId.value === null) {
      tickets.push({
        id: Date.now(),
        title: ticketForm.title,
        description: ticketForm.description,
        status: ticketForm.status,
        priority: ticketForm.priority,
      })
      toastMessage.value = 'Ticket added!'
      toastType.value = 'success'
    } else {
      const t = tickets.find(x => x.id === editingId.value)
      t.title = ticketForm.title
      t.status = ticketForm.status
      t.description = ticketForm.description
      t.priority = ticketForm.priority
      toastMessage.value = 'Ticket updated!'
      toastType.value = 'success'
    }

    editingId.value = null
    ticketForm.title = ''
    ticketForm.description = ''
    ticketForm.status = 'Open'
    ticketForm.priority = 'Medium'
    saveTickets()
    openModal.value = false
  }

  const editTicket = (t) => {
    ticketForm.title = t.title
    ticketForm.status = t.status
    ticketForm.description = t.description
    ticketForm.priority = t.priority
    editingId.value = t.id
    openModal.value = true
  }

  const confirmDelete = (t) => {
    confirm.show = true
    confirm.message = `Delete ticket "${t.title}"?`
    confirm.ticket = t
  }

  const deleteTicket = () => {
    const index = tickets.findIndex(x => x.id === confirm.ticket.id)
    if (index > -1) {
      tickets.splice(index, 1)
      saveTickets()
      toastMessage.value = 'Ticket deleted!'
      toastType.value = 'success'
    }
    confirm.show = false
  }
  const closeModal = () => {
    ticketForm.title = ''
    ticketForm.description = ''
    ticketForm.status = 'Open'
    ticketForm.priority = 'Medium'
    openModal.value = false;
    editingId.value = null;
  }
  return {
    tickets, ticketForm, errors, toastMessage, toastType,
    editingId, editTicket, addOrEditTicket, confirm, confirmDelete,
    logout, goDashboard, openModal, closeModal, deleteTicket
  }
}

  }
</script>
