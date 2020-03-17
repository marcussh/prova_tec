import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource';
import VeeValidate from 'vee-validate';
import VueValidate from 'vuelidate';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';


Vue.use(VueResource);
Vue.use(VeeValidate);
Vue.use(Vuelidate);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  el: '#app',
  render: h => h(App)
})
