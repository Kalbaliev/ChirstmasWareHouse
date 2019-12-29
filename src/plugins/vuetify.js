import Vue from 'vue'
import Vuetify from 'vuetify/'
import "vuetify/dist/vuetify.min.css"

Vue.use(Vuetify,{
    iconfont:'md',
    background:'red'
  
})

const opts = {}

export default new Vuetify(opts)