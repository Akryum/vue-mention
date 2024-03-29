import { createApp } from 'vue'
import VueMention from 'vue-mention'
import App from './App.vue'
import router from './router'
import 'floating-vue/dist/style.css'

const app = createApp(App)

app.use(VueMention)
app.use(router)

app.mount('#app')
