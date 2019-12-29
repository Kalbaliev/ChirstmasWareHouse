<template>
    <nav>
      
    
        <v-app-bar
          dark
          app
          src="./../src/assets/images/banner.jpg"
        >
          <v-app-bar-nav-icon v-if="isAuthenticated" @click="drawer=!drawer"></v-app-bar-nav-icon>
    
            <v-toolbar-title> 
              <span class="red--text text--lighten-1  font-weight-bold">Chirstmas</span> 
              <span class="font-weight-light">WareHouse</span> 
                   
                  <i class="fas fa-gift  amber--text"></i> 
        
            </v-toolbar-title>
    
          <v-spacer></v-spacer>

                    <v-menu
                               
                             
                               
                             
                             v-if="isAuthenticated"  
                             transition="slide-y-transition"
                             close-on-click
                             close-on-content-click
                             offset-y
                             bottom
                        >
                                <template v-slot:activator="{ on }">
                                <v-btn
                                    x-large
                                    class="mx-5"
                                    color="orange"
                                    outlined
                                    dark
                                    v-on="on"
                                >
                              
                                    <flag class="display-1" :iso="$t('language.icon')"> </flag>  
                                    <span class="headline">&nbsp {{$t('language.name')}} </span>
                                </v-btn>
                                </template>
                            <v-list class="mt-5">
                                    <v-list-item
                                     @click="setLanguage('en')"
                                    >
                                         <flag class="display-1" iso="us"> </flag>  
                                         &nbsp English
                                    </v-list-item>
                                    <v-list-item
                                        @click="setLanguage('az')"
                                    >
                                         <flag class="display-1" iso="az"> </flag>  
                                         &nbsp Azerbaijani
                                    </v-list-item>
                            </v-list>
                    </v-menu>
                    <v-menu

                            
                             v-if="isAuthenticated"  
                             transition="slide-y-transition"
                             bottom
                        >
                                <template v-slot:activator="{ on }">
                                <v-btn
                                  
                                    outlined
                                    dark
                                    v-on="on"
                                >
                                <v-icon color="white " style="vertical-align:baseline ">mdi-account</v-icon>
                                    {{displayName}}
                                </v-btn>
                                </template>
                            <v-list>
                                    <v-list-item
                                         @click.prevent="logoutAuth" 
                                    >
                                        <v-icon right>mdi-export</v-icon>   
                                        <v-list-item-title> &nbsp {{$t('Header.signOutTxt')}} </v-list-item-title>
                                    </v-list-item>
                            </v-list>
                    </v-menu>

                <v-btn  v-if="isAuthenticated"  color="transparent" class="success mx-5 " router :to="'/gifts/addgift'">
                        <span>{{$t('Header.addNewProductTxt')}}</span>
                
                    </v-btn>
               
                        
             
           
        </v-app-bar>
   

  

    <v-navigation-drawer
     v-if="isAuthenticated" 
     v-model="drawer" 
     app 
     src="./../src/assets/images/banner-vertical.jpg"
 
     class="green darken-4 ">
      
            <v-layout column align-center>

                <v-flex class="mt-5 px-5">
                   
                        <v-img class="mx-4" height="150" width="150" src="./../../../src/assets/images/logo.png" > </v-img>
                    
                       
                    <p class="white--text subheading mt-4"> <span class="red--text text--lighten-1  font-weight-bold">Chirstmas</span> 
                 <span class="font-weight-light">WareHouse</span> 
                   
                  <i class="fas fa-gift  amber--text"></i>  </p>
                </v-flex>
                <!-- <v-flex>
                    <appGiftAdd/>
                </v-flex> -->
            </v-layout>


            
       
      
        <v-list  >

            <v-list-item color="orange"   router to="/"> 
                <v-list-item-icon>
                     <v-icon class="white--text text--darken-2">mdi-home</v-icon> 
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="white--text text--darken-2 font-weight-light">{{$t('Header.homeTxt')}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item color="orange"   router to="/gifts"> 
                <v-list-item-icon>
                     <v-icon class="white--text text--darken-2">mdi-gift</v-icon> 
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="white--text text--darken-2 font-weight-light">{{$t('Header.giftsTxt')}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item color="orange"   router to="/about"> 
                <v-list-item-icon>
                     <v-icon class="white--text text--darken-2">mdi-comment-text</v-icon> 
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="white--text text--darken-2 font-weight-light">{{$t('Header.aboutTxt')}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

    </v-navigation-drawer>
    </nav>
</template>

<script>

import GiftAdd from "./../gifts/GiftAdd"
import {mapGetters} from "vuex"
import {mapMutations} from "vuex"
export default {
    components:{

        appGiftAdd:GiftAdd
    }
    ,
    data(){
        return{

            displayName:localStorage.getItem("displayName"),
            drawer:false ,
          
        }
    },
    computed:{
        ...mapGetters(['getSnackbar','isAuthenticated']),

    },
    methods:{

       ...mapMutations(['setLanguage']),
       
       logoutAuth(){

           this.$store.dispatch("logout");
       }
      
      

    }
    
}
</script>

<style scoped>
.center {
  display: block;
  margin: 3vh;
  margin-left: auto;
  margin-right: auto;
  width: 50%;

}
</style>