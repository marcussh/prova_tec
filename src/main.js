import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue } from 'bootstrap-vue';
import VueResource from 'vue-resource';
import Vuelidate from 'vuelidate';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(Vuelidate);
new Vue({
  el: '#app',
  render: h => h(App)
})
