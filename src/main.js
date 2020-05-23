import Vue from 'vue'
import store from './store'
import App from './App.vue'
import 'materialize-css/dist/js/materialize.min'
import router from "./router"
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import Paginate from 'vuejs-paginate'

Vue.component('Paginate', Paginate)
Vue.use(firestorePlugin)
firebase.initializeApp({
  projectId: 'notebook-918be',
  databaseURL: 'https://notebook-918be.firebaseio.com'
})
export const db = firebase.firestore()

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
