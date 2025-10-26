<script setup>
import logo from '../assets/fixMate-logo-transparent.png'
</script>
<template>
  <div class="auth-page position-relative">
    <div class="container">
      <div class="d-flex justify-content-center gap-3 flex-column align-items-center">
        <button class="back border-0 mt-4" @click="navigateTo('/')">
          <i class="fa-solid fa-arrow-left"></i> Back to home
        </button>
        <div class="login-card card border-0 align-items-center justify-content-center rounded-4 px-5 pb-4">
          <div class="logo">
            <img :src="logo" alt="FixMate Logo" />
          </div>
          <h1 class="text-center">{{ mode === 'login' ? 'Welcome Back' : 'Create Account' }}</h1>
          <p class="text-center mb-5">{{ mode === 'login' ? 'Login to access your dashboard' : 'Sign up to get started' }}</p>
          <form class="d-flex flex-column gap-3 w-100" @submit.prevent="mode === 'login' ? handleLoginSubmit() : handleSubmit()">
            <div v-if="mode !== 'login'" class="name d-flex flex-column">
              <label for="username">Full Name</label>
              <input id="username" type="text" v-model="formData.uname" required/>
              <span class="text-danger">{{ errors.uname }}</span>
            </div>

            <div v-if="mode === 'login'">
              <input id="email" type="email" v-model="loginData.email" required />
            </div>
            <div v-else>
              <input id="email" type="email" v-model="formData.email" required />
            </div>


            <div v-if="mode === 'login'">
              <input id="password" type="password" v-model="loginData.password" required />
            </div>
            <div v-else>
              <input id="password" type="password" v-model="formData.password" required />
            </div>


            <div v-if="mode !== 'login'" class="cpassword d-flex flex-column">
              <label for="cpassword">Confirm Password</label>
              <input id="cpassword" type="password" v-model="formData.cpassword" required/>
              <span class="text-danger">{{ errors.cpassword }}</span>
            </div>

            <button class="coloured-btn" type="submit">{{ mode==='login'? 'Login' : 'Sign Up' }}</button>
          </form>

          <p class="mt-3" v-if="mode==='login'">
            Don't have an account? <span class="toggle-link" @click="navigateTo('/auth/signup')">Sign Up</span>
          </p>
          <p class="mt-3" v-else>
            Already have an account? <span class="toggle-link" @click="navigateTo('/auth/login')">Login</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  props: ['mode', 'onLogin', 'displayToast'],
  setup(props) {
    const router = useRouter();
    const navigateTo = (path) => router.push(path);

    const errors = ref({});
    const formData = ref({ uname:'', email:'', password:'', cpassword:'', tickets: [] });
    const loginData = ref({ email:'', password:'' });

    const handleLoginSubmit = async () => {
      errors.value = {};
      let isValid = true;
      if(!/\S+@\S+\.\S+/.test(loginData.value.email)) { errors.value.email="Invalid email"; isValid=false; }
      if(loginData.value.password.length<12) { errors.value.password="Password too short"; isValid=false; }
      if(!isValid) return;

      try {
        const result = await axios.get("https://68fdfc407c700772bb12762f.mockapi.io/ticket-management/users");
        const user = result.data.find(u => u.email===loginData.value.email);
        if(!user){ errors.value.email="Account does not exist"; return; }
        if(user.password!==loginData.value.password){ errors.value.password="Wrong password"; return; }
        localStorage.setItem("currentUser", JSON.stringify(user));
        props.displayToast("Login successful","success");
        props.onLogin();
        navigateTo("/dashboard");
      } catch(e){ props.displayToast("Authentication failed","error"); }
    }

    const handleSubmit = async () => {
      errors.value={}; let isValid=true;
      if(formData.value.uname.length<3) { errors.value.uname="Enter a valid name"; isValid=false; }
      if(!/\S+@\S+\.\S+/.test(formData.value.email)) { errors.value.email="Invalid email"; isValid=false; }
      if(formData.value.password.length<12) { errors.value.password="Password too short"; isValid=false; }
      if(formData.value.cpassword!==formData.value.password){ errors.value.cpassword="Passwords do not match"; isValid=false; }
      if(!isValid) return;

      try {
        const result = await axios.get("https://68fdfc407c700772bb12762f.mockapi.io/ticket-management/users");
        if(result.data.some(u=>u.email===formData.value.email)){
          errors.value.email="Account exists"; props.displayToast("Email exists","error"); return;
        }
        await axios.post("https://68fdfc407c700772bb12762f.mockapi.io/ticket-management/users", formData.value);
        props.displayToast("Account created successfully","success");
        loginData.value.email=formData.value.email; loginData.value.password=formData.value.password;
        navigateTo("/auth/login");
      } catch(e){ props.displayToast("Error occurred","error"); }
    }

    return { formData, loginData, errors, navigateTo, handleLoginSubmit, handleSubmit };
  }
};
</script>
