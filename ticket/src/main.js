import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

// CoreUI Vue imports
import '@coreui/coreui/dist/css/coreui.min.css'
import '@coreui/coreui/dist/js/coreui.bundle.min.js'

createApp(App)
  .use(router)
  .mount("#app")
