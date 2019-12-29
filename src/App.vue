<template>
  <v-app :style="[isAuthenticated ? {background:authenticatedBackground}: {backgroundImage:unAuthenticatedBackground.image, backgroundSize:unAuthenticatedBackground.size}]">
    
  
 
 
    <app-header v-if="isAuthenticated"></app-header>
    <v-content class="mx-10 mt-5 mb-5">
        <v-snackbar multi-line :timeout="5000"  :color="getSnackbar.color" v-model="getSnackbar.status">
            <span :class="[getSnackbar.textColor]">{{getSnackbar.message}}</span>
            <v-btn :color="getSnackbar.btnColor" :class="[getSnackbar.textBtnColor]" @click="closeSnackbar" >{{$t('Snackbar.closeTxt')}}</v-btn>
        </v-snackbar>
 <transition name="fadeMain" mode="out-in">
      <router-view ></router-view>

  
 </transition>

    </v-content>

<app-footer v-if="isAuthenticated && routerPath==='/'"></app-footer>
  </v-app>  
  
</template>

<script>
import Header from "./components/shared/Header"
import Footer from "./components/shared/Footer"
import { mapGetters,mapMutations } from 'vuex'
export default {
  
  data(){

    return {
      authenticatedBackground:'linear-gradient(to left, yellow, #0f3443)',
      unAuthenticatedBackground: {
        image:' url("./src/assets/images/bg.jpg")',
        size:'cover'
      }
    }
  },

  components:{
    appHeader:Header,
    appFooter:Footer
  },
  computed:{
  
    ...mapGetters(['getSnackbar','isAuthenticated']),

      routerPath(){


        return this.$route.fullPath
      }
  },
  methods:{
     ...mapMutations(["closeSnackbar"]),
  },
  created(){
    
        
       
 
    this.$store.dispatch("initAuth")
  
  }
  
}
</script>


<style  >

html { overflow-y: auto }
  
  .fadeMain-enter{
    opacity:0;
  }
  .fadeMain-enter-active{
    transition: opacity .3s ease-out;
  }
  .fadeMain-leave{}

  .fadeMain-leave-active{
    transition: opacity .3s ease-out;
    opacity:0
  }
</style>
