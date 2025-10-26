<script setup>
import logo from '../assets/fixMate-logo-transparent.png'
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-custom p-0">
    <div class="container d-flex justify-content-between align-items-center w-100">
      <div class="logo"><img :src="logo" alt="FixMate Logo" /></div>
      <div><button class="coloured-btn" @click="navigateTo('/auth/signup')">Get Started</button></div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  setup(){
    const router = useRouter();
    const navigateTo = (path) => router.push(path);
    return { navigateTo };
  }
}
</script>
