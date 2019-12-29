import Vue from "vue"
import {router} from "./../../router"

import {store} from "./../store"

import {i18n} from "./../../plugins/i18n"
import axios from "axios"

const state = {
    
    language:localStorage.getItem("lang"),

  
  }

const mutations = { 

        setLanguage(state,locale){

            localStorage.setItem("lang",locale);
            i18n.locale=locale
            state.language= locale
          

        },
      

}



export default  {

    state,
    mutations
  
}