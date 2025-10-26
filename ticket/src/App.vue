<template>
  <div id="app">
    <!-- Navigation always visible -->
    <Navigation />

    <!-- Toast -->
    <Toast :toastDisplay="toastDisplay" />

    <!-- Routed pages -->
    <router-view 
      :displayToast="displayToast" 
      :onLogin="handleLogin" 
      :onLogout="handleLogout"
    />

    <!-- Footer always visible -->
    <Footer :isAuthenticated="isAuthenticated" />
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import Navigation from "./components/Navigation.vue"
import Footer from "./components/Footer.vue"
import Toast from "./components/Toast.vue"

const router = useRouter()

// Auth state
const isAuthenticated = ref(sessionStorage.getItem("isAuthenticated") === "true")
const toastDisplay = ref({ display: false, message: "", type: "success" })

// Toast helper
function displayToast(message, type = "success") {
  toastDisplay.value = { display: true, message, type }
  setTimeout(() => toastDisplay.value.display = false, 3000)
}

// Login & logout handlers
function handleLogin() {
  isAuthenticated.value = true
  sessionStorage.setItem("isAuthenticated", "true")
}

function handleLogout() {
  isAuthenticated.value = false
  sessionStorage.removeItem("isAuthenticated")
  router.push("/auth/login")
}
</script>

<style>
/* You said your styles already exist, so no changes here */
</style>
