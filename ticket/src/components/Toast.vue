<template>
  <div v-if="show" :class="['toast', type]">{{ message }}</div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  props: { message: String, type: { type: String, default: 'success' }, duration: { type: Number, default: 3000 } },
  setup(props) {
    const show = ref(false)
    watch(() => props.message, val => {
      if (val) {
        show.value = true
        setTimeout(() => (show.value = false), props.duration)
      }
    })
    return { show }
  }
}
</script>

<style scoped>
.toast { position: fixed; top:20px; right:20px; padding:1rem 1.5rem; border-radius:0.5rem; color:#fff; z-index:1000; }
.toast.success { background-color: #4caf50; }
.toast.error { background-color: #f44336; }
</style>
