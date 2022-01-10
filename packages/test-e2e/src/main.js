import Vue from 'vue'
import VueMention from 'vue-mention'
import App from './App.vue'
import router from './router'
import 'v-tooltip/dist/v-tooltip.css'

Vue.use(VueMention)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
