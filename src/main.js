import Vue from 'vue'
import App from './App.vue'
import Vuelidate from "vuelidate"

import vuetify from './plugins/vuetify.js' // path to vuetify export

import {router} from "./router"
import {store} from "./store/store"
import {i18n} from "./plugins/i18n"


import { parseTwoDigitYear } from 'moment'

Vue.use(Vuelidate)


Vue.filter("currency",(value)=>{


     if(i18n.locale=='en'){
    
      return String.fromCharCode(36)+" "+Math.floor((parseFloat(value)*0.58)).toLocaleString(undefined,{minimumFractionDigits:2})
     }
     else{
      return String.fromCharCode(8380)+" "+parseFloat(value).toLocaleString(undefined,{minimumFractionDigits:2})
     }
  
})

new Vue({
  el: '#app',
  render: h => h(App),
  vuetify,
  i18n,
  router,
  store
})

