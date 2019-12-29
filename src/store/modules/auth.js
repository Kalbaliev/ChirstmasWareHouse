import Vue from "vue"
import {router} from "./../../router"

import {store} from "./../store"

import axios from "axios"
import { i18n } from "../../plugins/i18n"


const state = {
    
    token:'',
    displayName:'',
    APIKey:'AIzaSyD8gPbSLrmEsb_ey35uAR3fYMKB8B5uGqI',

  
  }
const getters = {


    isAuthenticated(state) {

        //if token is not empty return true
        return state.token !==''
    }




}
const mutations = { 

        setToken(state,token){

            state.token=token
        },

       
        clearToken(state){
            state.token=''
        }

}

const actions = {

    
    initAuth({dispatch,commit,state}){

         



        let token = localStorage.getItem("token");

        if(token){

          

            let expiresDate = localStorage.getItem("expiresDate");
            let now = new Date().getTime();

            if ( now  > +expiresDate) {

                dispatch("logout")
            }
            else{ 
                commit("setToken", token)
                dispatch("expiresTimer", +expiresDate-now)
             
                router.push(router.apps[0]._route.fullPath).catch(error => {
                    if (error.name != "NavigationDuplicated") {
                      throw error;
                    }
                  });
            }
            
            
        }
        else{ 
            router.replace("/auth").catch(error=>{

                if (error.name != "NavigationDuplicated") {
                    throw error;
                  }
            })
        }

     
    },
    login({commit,dispatch,state},payload){

        store.state.common.loading=true
        let authLink="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
        if(payload.isUser) {
            authLink="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
        }
       
          axios.post(
                authLink+state.APIKey,
                {email:payload.email,displayName:payload.displayName,password:payload.password,returnSecureToken:true}
            )
            .then(response=>{

           
                commit("setToken", response.data.idToken)
       
          
                localStorage.setItem("token",response.data.idToken);
                localStorage.setItem("displayName",response.data.displayName);
                localStorage.setItem("expiresDate",new Date().getTime()+ +response.data.expiresIn*1000);
              
                dispatch("expiresTimer",+response.data.expiresIn*1000)


                store.state.common.loading=false
                router.replace("/")
                let welcomeMsg=i18n.t('Snackbar.welcomeTxt')
                store.state.common.snackbar= { 
                    action:'login',
                    message:response.data.displayName+', '+ welcomeMsg,
                    color:'yellow darken-4',
                    btnColor:'black ligten-4',
                    textBtnColor:'white--text',
                    textColor:'white--text',
                    status:true
                }
                
            })
            .catch(error=>{

                store.state.common.loading=false
                router.replace("/auth").catch(error=>{

                    if (error.name != "NavigationDuplicated") {
                        throw error;
                      }
                })

                let errorMessage=i18n.t('Snackbar.loginErrorTxt')

                if(!payload.isUser){                   
                    errorMessage=i18n.t('Snackbar.registerErrorTxt')
                }
              
                store.state.common.snackbar= { 
                    action:'Error',
                    message: errorMessage,
                    color:'red darken-4',
                    btnColor:'black ligten-4',
                    textBtnColor:'white--text',
                    textColor:'white--text',
                    status:true
                }
             
            })


    },
    logout({commit,dispatch,state}){


            commit("clearToken");
            localStorage.removeItem("token")
            localStorage.removeItem("expiresDate")
            localStorage.removeItem("displayName")
            router.replace("/auth");
    },

    expiresTimer ({dispatch},expiresIn){
        setTimeout(()=>{
            dispatch("logout")
        },expiresIn)
    }
    


}

export default  {

    state,
    getters,
    mutations,
    actions
}