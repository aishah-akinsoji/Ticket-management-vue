<template>
  <Navigation />
  <div class="landing-page">
    <section class="hero position-relative">
      <div class="circle-lg position-absolute"></div>
      <div class="circle-xs position-absolute"></div>
      <div class="circle-md position-absolute"></div>
      <div class="circle-sm position-absolute "></div>
      <img src="/src/assets/wave.svg" class="position-absolute bottom-0"/>
      <div class="container">
        <div class="description position-absolute text-white d-flex gap-3 justify-content-center align-items-center flex-column text-center">
          <h1>Simplify Your Ticket Management</h1>
          <p class="px-3 py-0 ">Track, organize, and resolve tickets faster than ever. FixMate helps you stay on top of every issue with a smooth and responsive workflow.</p>
          <div class="buttons d-flex align-items-center justify-content-center gap-3">
            <button class="btn" @click="goSignup">Get Started</button>
            <button class="transparent-btn" @click="goLogin">Login</button>
          </div>
        </div>
      </div>
    </section>
    <section class="features py-5">
      <div class="container">
        <div class="d-flex text-center justify-content-center flex-column gap-5">
          <h2 class="pt-5">Why Choose fixMate?</h2>
          <div class="row w-100 justify-content-center gap-3">
            <div v-for="(feature, index) in features" :key="index" class="col-sm-12 col-md-3 d-flex justify-content-center p-4 align-items-start border-0 gap-2 card shadow-lg rounded-4 card-hover">
              <div class="icon">
                  <i :class="feature.icon"></i>
              </div>
              <h4 class="fs-5">
                  {{feature.title}}
              </h4>
              <p class="p-0 m-0 text-start">
                  {{feature.description}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="stats bg-white py-4">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-between">
                <div v-for="(stat, index) in stats" class="" :key="index">
                    <span className="stat-value display-2">{{stat.value}}</span>
                    <p>{{stat.title}}</p>
                </div>
            </div>
        </div>
    </section>
    <section class="call-to-action">
        <div class="container">
            <div class="d-flex flex-column text-center align-items-center justify-content-center text-white gap-2 py-5">
                <p class="m-0">Ready to Take Control of Your Workflow?</p>
                <span>Sign up now and start managing tickets effortlessly with FixMate.</span>
                <button class="btn mt-4" @click="goSignup"> Get Started for Free</button>
            </div>
        </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import Footer from '../components/Footer.vue'
import { useRouter } from 'vue-router'

export default {
  components: { Navigation, Footer },
  setup() {
    const router = useRouter()
    const goSignup = () => router.push('/auth/signup')
    const goLogin = () => router.push('/auth/login')
    const features = [
        {
            icon: "fa-solid fa-clipboard-list",
            title: "Seamless Ticket Tracking",
            description: "Create, view, and manage all your support tickets in one organized dashboard.",
        },
        {
            icon: "fa-solid fa-arrows-rotate",
            title: "Real-Time Updates",
            description: "Stay informed with instant feedback and live status changes.",
        },
        {
            icon: "fa-solid fa-bell",
            title: "Smart Notifications",
            description: "Get clear alerts for ticket actions, from errors to successful updates.",
        },
        {
            icon: "fa-solid fa-lock",
            title: "Secure Authentication",
            description: "Your data is safe. Sessions are stored securely using our simulated token system.",
        }
    ]
    const stats = [
        {
            value: "5K+",
            title: "Active Users",
        },
        {
            value: "20K+",
            title: "Tickets managed",
        },
        {
            value: "99.9%",
            title: "Uptime",
        }
    ]
    return { goSignup, goLogin, features, stats }
  }
}
</script>
