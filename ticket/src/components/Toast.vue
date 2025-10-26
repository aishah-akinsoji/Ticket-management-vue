<script setup>
import { CToast, CToastBody, CToastClose, CToaster } from '@coreui/vue'
</script>
<template>
  <CToaster>
    <CToast
      autohide
      :visible="toastDisplay.display"
      :class="`toast-bar align-items-center position-fixed text-white ${toastDisplay.type==='success'?'bg-success':'bg-danger'}`"
    >
      <div class="d-flex">
        <CToastBody>{{ toastDisplay.message }}</CToastBody>
        <CToastClose class="me-2 m-auto"/>
      </div>
    </CToast>
  </CToaster>
</template>

<script>
import { CToast, CToastBody, CToastClose, CToaster } from '@coreui/vue';

export default {
  props: ['toastDisplay']
}
</script>
