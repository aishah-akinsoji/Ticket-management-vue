<template>
  <div id="app">
    <router-view />
    <Toast v-if="toastMessage" :message="toastMessage" :type="toastType" />
  </div>
</template>

<script>
import { ref } from 'vue'
import Toast from './components/Toast.vue'

export default {
  components: { Toast },
  setup() {
    const toastMessage = ref('')
    const toastType = ref('success')

    return { toastMessage, toastType }
  }
}
</script>
