<script setup>
import logoWhite from '../assets/fixMate-white-logo-transparent.png'
</script>
<template>
  <footer>
    <div class="container">
      <div class="text-white row align-items-center justify-content-between">
        <div class="d-flex flex-column brand col-12 col-md-4">
          <div class="logo"><img :src="logoWhite" alt="FixMate Logo" /></div>
          <p class="text-white">Streamline your workflow with our powerful ticket management system.</p>
        </div>
        <div class="quick-links col-12 col-md-4">
          <h5>Quick Links</h5>
          <ul class="list-unstyled">
            <li><a @click="navigateTo('/')">Home</a></li>
            <li><a @click="isAuthenticated ? navigateTo('/dashboard') : navigateTo('/auth/login')">{{ isAuthenticated ? 'Dashboard' : 'Login' }}</a></li>
            <li><a @click="isAuthenticated ? navigateTo('/tickets') : navigateTo('/auth/signup')">{{ isAuthenticated ? 'Tickets' : 'Signup' }}</a></li>
          </ul>
        </div>
        <div class="contact col-12 col-md-4">
          <h5>Contact</h5>
          <p>support@fixmate.com</p>
          <p>&copy;{{ year }} fixMate. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  props: ['isAuthenticated'],
  setup(props){
    const router = useRouter();
    const navigateTo = (path) => router.push(path);
    const year = new Date().getFullYear();
    return { navigateTo, year };
  }
}
</script>
