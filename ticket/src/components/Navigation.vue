<template>
  <nav class="navbar navbar-expand-lg navbar-custom p-0">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center w-100">
        <div class="logo"><img src="/src/assets/fixMate-logo-transparent.png" alt="Logo"/></div>
        <div>
          <button class="coloured-btn" @click="goSignup">Get Started</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const goSignup = () => router.push('/auth/signup')
    return { goSignup }
  }
}
</script>

