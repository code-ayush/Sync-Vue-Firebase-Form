import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/tailwind.css'

import { firestorePlugin } from 'vuefire'
import router from './router'

Vue.use(firestorePlugin)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
