import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Toasted from 'vue-toasted'
import router from './router'

Vue.config.productionTip = false

Vue.use(Toasted, {
  theme: "toasted-primary",
  position: "top-right",
  duration: 3000
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
