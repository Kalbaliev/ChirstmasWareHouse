import Vue from "vue"
import {router} from "./../../router"
import {store} from "./../store"
import {i18n} from "./../../plugins/i18n"
import axios from "axios"

const state = {
    products:[],
  
  
  }
const getters= {

    getProducts(state){

        // return state.products
        
        return category =>state.products.filter(element=>{

            if(category=='all') {
                return state.products

            }
                else{ 
                    return element.category==category;
                }
            
          })
       
    },

    getProduct(state){


        
        return id =>state.products.filter(element=>{
          return element.id==id;
        })
      }


}
const mutations = { 

    uploadProducts(state,payload) {

        
      state.products.push(payload);
      
    },
  
}

const actions = {


    getProductsSync({commit,state}){

        axios.get("https://chirstmaswarehouseapp.firebaseio.com/products.json")
        .then(response=>{

                state.products=[]
                let data=response.data;

                for (let key in data){

                    data[key].id=key;

                    commit("uploadProducts",data[key])
                }

        })
        .catch(err=>{

            store.dispatch("logout")
            
            let serverErrorMsg=i18n.t('Snackbar.serverErrorTxt')
            store.state.common.snackbar= { 
                action:'Error',
                message: serverErrorMsg,
                color:'red darken-4',
                btnColor:'black ligten-4',
                textBtnColor:'white--text',
                textColor:'white--text',
                status:true
            }
        })
    },

    addProductSync({commit,state},payload) {

       
        store.state.common.loading=true;
        axios.post("https://chirstmaswarehouseapp.firebaseio.com/products.json",payload)
        .then(response=>{
         
          commit("uploadProducts",payload)

          store.state.common.loading=false;
          router.replace("/gifts")
          let productSuccessMsg=i18n.t('Snackbar.addProductSuccessTxt')
          store.state.common.snackbar= { 
              action:'addproduct',
              message:'Added New Product to Gifts, Success!',
              color:'green darken-4',
              btnColor:'red ligten-4',
              textBtnColor:'black--text',
              textColor:'white--text',
              status:true
          }
        })
        .catch(err=>{
            
            store.state.common.loading=false
            router.replace("/gifts/addgift")
            let productErrorMsg=i18n.t('Snackbar.addProductErrorTxt')
            store.state.common.snackbar= { 
                action:'Error',
                message: productErrorMsg,
                color:'red darken-4',
                btnColor:'black ligten-4',
                textBtnColor:'white--text',
                textColor:'white--text',
                status:true
            }
        })
       
 
        
    }

}

export default  {

    state,
    getters,
    mutations,
    actions
}