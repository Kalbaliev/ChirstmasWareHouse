import Vue from "vue"
import {router} from "./../../router"

import axios from "axios"

const state = {
   
    loading:false,
    snackbar:{
        status:false
    }
  
  }
const getters= {

    getLoading(state) { 
        return state.loading;
    },
    getSnackbar(state) {
        
       return state.snackbar
     
    }


}
const mutations = { 

    closeSnackbar(state) {

        state.snackbar.status=false;
        
      },
    
}

const actions = {



}

export default  {

    state,
    getters,
    mutations,
    actions
}