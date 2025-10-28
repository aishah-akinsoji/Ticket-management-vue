<template>
  <footer class="footer">
    <div class="container">
        <div class="text-white row align-items-center justify-content-between">
            <div className="d-flex flex-column brand col-12 col-md-4">
                <div className="logo">
                    <img src="/src/assets/fixMate-white-logo-transparent.png"/>
                </div>
                <p className="text-white">Streamline your workflow with our powerful ticket management system.</p>
            </div>
            <div className="contact col-12 col-md-4">
                <h5>Contact</h5>
                <p>support@fixmate.com</p>
                <p>&copy;{{year}} fixMate. All rights reserved.</p>
            </div>
        </div>
    </div>
  </footer>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup(){
    const router = useRouter()
    const goSignup = () => router.push('/auth/signup')
    const goLogin = () => router.push('/auth/login')
    const date = new Date();
    const year = date.getFullYear()
    return{ goSignup, goLogin, year }
  }
}</script>

<style scoped>

</style>
