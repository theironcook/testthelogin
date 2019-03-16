import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';

Vue.config.productionTip = false

// global response interceptor for errors or auth issues
axios.interceptors.response.use(undefined, (err) => {
  if(err.response.status === 403){
    alert('looks like you arent logged in right now');
    window.location.href = 'login.html';
  }
  // todo
  else if(err.response.status === 400){
    console.error('bart, got a 400 ', err)
  }
  else if(err.response.status === 500){
    console.error('bart, got a 500 ', err)
  }
  else if(err.response.status !== 200){
    console.error('bart, unknown error ', err)
  }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
