<template>
  <div class="auth-page">
    <div class="auth-page position-relative">
      <div class="container">
        <div class="d-flex justify-content-center gap-3 flex-column align-items-center">
          <button class="back border-0 mt-4" @click="goToHome">
            <i class="fa-solid fa-arrow-left"></i> Back to home
          </button>
          <div class="login-card card border-0 align-items-center justify-content-center rounded-4 px-5 pb-4">
            <div class="logo">
              <img src="/src/assets/fixMate-logo-transparent.png" alt="FixMate Logo"/>
            </div>
            <h1 class="text-center">{{mode === "login" ? "Welcome Back" : "Create Account"}}</h1>
            <p class="text-center mb-5">{{mode === "login" ? "Login to access your dashboard" : "Sign up to get started"}}</p>
            <form class="d-flex flex-column gap-3 w-100" @submit.prevent="handleSubmit">
              <div v-if="mode !== 'login'" class="name d-flex flex-column">
                <label for="username">Full Name</label>
                <input id="username" type="text" v-model="form.uname" required/>
                <span class="text-danger">{{ errors.uname }}</span>
              </div>
              <div class="email d-flex flex-column">
                <label for="email">Email</label>
                <input id="email" type="email" v-model="form.email" required/>
                <span class="text-danger">{{errors.email}}</span>
              </div>
              <div class="password d-flex flex-column">
                <label for="password">Password</label>
                <input id="password" type="password" v-model="form.password" required/>
                <span class="text-danger">{{errors.password}}</span>
                <span class="password-rule">max: 8 characters;<br/>at least one symbol;<br/>at least one letter;<br/> at least one digit</span>
              </div>
              <div v-if="mode !== 'login'" class="cpassword d-flex flex-column">
                <label for="cpassword">Confirm Password</label>
                <input id="cpassword" type="password" v-model="form.cpassword" required/>
                <span class="text-danger">{{errors.cpassword}}</span>
              </div>
              <button class="coloured-btn">{{ mode === "login" ? 'Login' : "Sign Up" }}</button>
            </form>
            <p class="mt-3" v-if="mode === 'login'">
              Don't have an account? <span class="toggle-link" @click="goSignup">Sign Up</span>
            </p>
            <p class="mt-3" v-else>
              Already have an account? <span class="toggle-link" @click="goLogin">Login</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Toast :message="toastMessage" :type="toastType"/>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import Footer from '../components/Footer.vue'
import Toast from '../components/Toast.vue'
import { useRouter } from 'vue-router'

export default {
  components: { Toast },
  props: ['mode'],
  setup(props){
    const router = useRouter()
    const form = reactive({ uname:'', email:'', password:'', cpassword: '' })
    const errors = reactive({ uname:'', email:'', password:'', cpassword: '' })
    const toastMessage = ref('')
    const toastType = ref('success')
    const goToHome = () => {
      router.push('/')
    }
    const goSignup = () => router.push('/auth/signup');
    const goLogin = () => router.push('/auth/login')
    const validate = () => {
      let valid = true;
      errors.uname = ''; 
      errors.email = ''; 
      errors.password = ''; 
      errors.cpassword = '';

      const unameValid = /^[A-Za-z ]+$/.test(form.uname);
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
      const passwordDigitValid = /[0-9]/.test(form.password);
      const passwordSymbolValid = /[^A-Za-z0-9]/.test(form.password);
      const passwordLetterValid = /[A-Za-z]/.test(form.password);

      if (props.mode === "signup" && !unameValid) {
        errors.uname = 'Please enter a correct full name.';
        valid = false;
      }

      if (!emailValid) {
        errors.email = 'Please enter a valid email';
        valid = false;
      }

      if (form.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long.';
        valid = false;
      } else if (!passwordDigitValid) {
        errors.password = 'Password must contain at least one digit.';
        valid = false;
      } else if (!passwordSymbolValid) {
        errors.password = 'Password must contain at least one symbol.';
        valid = false;
      } else if (!passwordLetterValid) {
        errors.password = 'Password must contain at least one letter.';
        valid = false;
      }

      if (props.mode === "signup" && form.cpassword !== form.password) {
        errors.cpassword = 'Passwords do not match.';
        valid = false;
      }

      return valid;
    };


    const handleSubmit = () => {
  if (!validate()) return;

  if (props.mode === 'signup') {
    // Get all saved users (or empty array)
    const users = JSON.parse(localStorage.getItem('ticketapp_users')) || [];

    const userExists = users.some(u => u.email === form.email);
    if (userExists) {
      toastMessage.value = 'Account already exists!';
      toastType.value = 'error';
      return;
    }

    const newUser = {
      uname: form.uname,
      email: form.email,
      password: form.password,
      tickets: []
    };
    users.push(newUser);
    localStorage.setItem('ticketapp_users', JSON.stringify(users));

    toastMessage.value = 'Signup successful!';
    toastType.value = 'success';
    localStorage.setItem('ticketapp_session', JSON.stringify({ uname: form.uname, email: form.email, tickets: [] }));
    localStorage.setItem('loggedin_user', JSON.stringify({ uname: form.uname, email: form.email, tickets: [] }));
    router.push('/dashboard');

  } else {
    const users = JSON.parse(localStorage.getItem('ticketapp_users')) || [];
    const foundUser = users.find(
      u => u.email === form.email && u.password === form.password
    );
    console.log(foundUser)
    if (foundUser) {
      localStorage.setItem('loggedin_user', JSON.stringify({ uname: foundUser.uname, email: form.email, tickets: foundUser.tickets}));
      localStorage.setItem('ticketapp_session', JSON.stringify({ uname: foundUser.uname, email: form.email, tickets: foundUser.tickets}));
      toastMessage.value = 'Login successful!';
      toastType.value = 'success';
      router.push('/dashboard');
    } else {
      toastMessage.value = 'Invalid email or password!';
      toastType.value = 'error';
    }
  }
};


    return { form, errors, handleSubmit, toastMessage, toastType, goToHome, goSignup, goLogin }
  }
}
</script>
