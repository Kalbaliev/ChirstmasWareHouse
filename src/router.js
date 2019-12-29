import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./components/Home";
import Auth from "./components/auth/Auth";

import Gifts from "./components/gifts/Gifts";
import GiftsStart from "./components/gifts/GiftsStart";
import GiftDetails from "./components/gifts/GiftDetails";
import GiftAdd from "./components/gifts/GiftAdd";

import About from "./components/About";


import {store} from "./store/store.js"
import {i18n} from "./plugins/i18n"



Vue.use(VueRouter);

const routes=[
    { path:'/',component:Home,name:"homepage" ,
    
   
    },

    { path:'/gifts',component:Gifts,name:"gifts",

        children:[

            {path:'', component:GiftsStart , name:"giftsStart"},
            { path:'addgift',component:GiftAdd,name:"addgift",},
            {path:':id', component:GiftDetails , name:"giftdetails"}

        ],
         
    },
    { path:'/about',component:About,name:"about",
    
         
    },
 
    { path:'/auth',component:Auth,name:"authentication",
  
    
    
    },  
    { path:"*",redirect:"/" ,
      
         
  }
  ];

export const router = new VueRouter({
    routes,
    mode:"history"
  })


  router.beforeEach((to,from,next)=>{
    if(store.state.langs.language && store.state.langs.language!==i18n.locale){

      i18n.locale=store.state.langs.language;
      next();
    }
    else if(!store.state.langs.language){
      i18n.locale='en';
      localStorage.setItem("lang",'en');
      next()
    }
    else{
      next();
    }
  })

  



  