<template>
 
   
      <v-container fill-height>
             <v-menu
                               
                             
                           
                             transition="slide-y-transition"
                             close-on-click
                             close-on-content-click
                             offset-y
                             bottom
                        >
                                <template v-slot:activator="{ on }">
                                <v-btn
                                    x-large
                                   style="position:absolute"
                                    color="orange"
                                    outlined
                                    dark
                                    v-on="on"
                                >
                              
                                  <v-img height="40" width="40" :src="'./src/assets/images/langs/'+$t('language.icon')+'.png'"></v-img>
                                    <span class="headline">&nbsp {{$t('language.name')}} </span>
                                </v-btn>
                                </template>
                            <v-list class="mt-5">
                                    <v-list-item
                                     @click="setLanguage('en')"
                                    >
                                           <v-img   max-height="40" max-width="40" src="./src/assets/images/langs/en.png"></v-img>
                                             
                                                    &nbsp {{$t('language.en')}}
                                    </v-list-item>
                                    <v-list-item
                                        @click="setLanguage('az')"
                                    >
                                        <v-img max-height="40" max-width="40" src="./src/assets/images/langs/az.png"></v-img>
                                         &nbsp {{$t('language.az')}}
                                    </v-list-item>
                            </v-list>
                    </v-menu>    
                       
                  <v-layout justify-center align-center >
                <v-flex xs12 sm8 md6 lg4>
              
                    <v-card elevation="10" >
                            
                        <v-tabs color="orange" grow  ripple="false">
                            <v-tab @click="isUser=true" :class="[isUser ? 'darken-3 white--text' : 'lighten-3 black--text','green ']" :ripple="false" key="1" href="#SignIn">{{$t('Auth.signInTxt')}}</v-tab>
                            <v-tab @click="isUser=false" :class="[isUser ? ' lighten-3 black--text' : 'darken-3 white--text', 'green']" :ripple="false" key="2" href="#SignUp">{{$t('Auth.signUpTxt')}}</v-tab>
                            
                            <v-tab-item   key="1" :value="isUser? 'SignIn' : 'SignUp'">
                                <v-card elevation="15"  class="blue lighten-3">
                       
                               
                      

                                <v-card-text>
                                    <v-form  @submit.prevent="onSubmit"  class="px-3" ref="form">
                                      
                                         <v-layout  column align-center>
                                                    <v-flex >

                                                       <v-img class="mx-8" height="150" width="150"   src="./../../../src/assets/images/logo.png" >

                                                        </v-img>
                                                         <h2 class="oran--text subheading mt-4"> 
                                                                    <span class="red--text text--lighten-1  font-weight-bold">Chirstmas</span> 
                                                                    <span class="font-weight-light">WareHouse</span> 
                                                                    <i class="fas fa-gift  amber--text"></i> 
                                                         </h2>
                                                 </v-flex>
                                        </v-layout>   
                                      
                                        <h2 class="text-center mt-4"> {{isUser ? $t('Auth.signInTxt'): $t('Auth.signUpTxt')}}</h2>

                                         <v-text-field
                                            v-if="!isUser"
                                            
                                            v-model.trim="user.displayName"
                                            :rules="displayNameRules"
                                            :counter="20"
                                            :label="$t('Auth.displayNameTxt')"
                                            required
                                            prepend-inner-icon="mdi-account"
                                        >

                                        </v-text-field>
                                        <v-text-field
                                        
                                        @input="$v.user.email.$touch()"
                                        v-model.trim="user.email"
                                        :error-messages="emailErrorMessages"
                                        :rules="emailRules"
                                        :counter="30"
                                          :label="$t('Auth.emailTxt')"
                                        required
                                        
                                        prepend-inner-icon="mdi-mail"
                                        >

                                        </v-text-field>
                                        <v-text-field

                                          @input="$v.user.email.$touch()"
                                            v-model.trim="user.password"
                                            prepend-inner-icon="mdi-lock"
                                            :rules="passRules"
                                            :counter="16"
                                           :label="$t('Auth.passwordTxt')"
                                            required
                                        ></v-text-field>

                                            <v-text-field 
                                             v-if="!isUser"

                                            @input="$v.user.repassword.$touch()"
                                            v-model.trim="user.repassword"
                                            :error-messages="rePassErrorMessages"
                                            prepend-inner-icon="mdi-lock"
                                            :rules="passRules"
                                            :counter="16"
                                            :label="$t('Auth.rePasswordTxt')"
                                            required
                                        ></v-text-field>
                                        
                                                <v-layout  column align-center>
                                                    <v-flex >
                                                        <v-btn :loading="getLoading" type="submit" primary x-large  class="green white--text mt-10 mx-0" >{{isUser ? $t('Auth.loginTxt') : $t('Auth.registerTxt')}}</v-btn>
                                                    </v-flex>
                                                </v-layout>        
                                    </v-form>
                                </v-card-text>
                                </v-card>
                            </v-tab-item>
                            
                               
                        </v-tabs>
                    </v-card>
                </v-flex>
            </v-layout>

      </v-container>


      
</template>

<script>

import moment, { min, max } from "moment"
import axios from "axios";
import {mapGetters} from "vuex"
import {mapMutations} from "vuex"
import {required,email,sameAs} from "vuelidate/lib/validators"
export default {
        
    validations:{

            user:{
               
                email:{
                    required,
                    email,
           
                },
                password:{
                    required,
       
                },
                repassword:{
                    required,
                   
                    sameAs:sameAs('password')
                }
            }
    },


    data(){
        return{

            isUser:true,

            user:{
                displayName:"",
                email:"",
                password:"",
                repassword:"",
      
            },

            displayNameRules: [
                v => !!v || this.$t('Auth.requiredDisplayNameTxt'),
                v => v!=undefined && v.length >= 5 || this.$t('Auth.minLengthDisplayNameTxt'),
                v => v!=undefined &&  v.length <= 20 || this.$t('Auth.maxLengthDisplayNameTxt')
                
                ],

            emailRules: [
                v => !!v || this.$t('Auth.requiredEmailTxt'),
                v => v!=undefined &&  v.length >= 5 || this.$t('Auth.minLengthEmailTxt'),
                v => v!=undefined  && v.length <= 30 || this.$t('Auth.maxLengthEmailTxt')
                
                 
                ],
            passRules: [
                v => !!v  || this.$t('Auth.requiredPasswordTxt'),
                  v => v!=undefined &&  v.length >= 5 || this.$t('Auth.minLengthPasswordTxt'),
                v => v!=undefined  && v.length <= 16 || this.$t('Auth.maxLengthPasswordTxt')
              
                ],
           
           
          
        
        }

     
    },

    computed:{
        ...mapGetters(["getLoading"]),


        emailErrorMessages(){

                    const errors = []

                    !this.$v.user.email.email && errors.push(this.$t('Auth.validateEmailTxt'))
                    return errors
                
        },
     
        rePassErrorMessages(){

                    const errors = []
                       
                    !this.$v.user.repassword.sameAs && errors.push(this.$t('Auth.sameAsPasswordTxt'))
                    return errors
        }
    },
    methods:{
               ...mapMutations(['setLanguage']),
        
        onSubmit(){

        
            
           this.$store.dispatch("login",{...this.user,isUser:this.isUser})
           setTimeout(()=>{
               this.user={}
           },1000)
        
        }
    }

   
  

}
</script>



<style scoped>


.v-tab--active {
    background-color: white;
}
/* .v-ripple__container {
    opacity: 0
} */
.theme--light.v-tabs .v-tab--active:hover::before, .theme--light.v-tabs .v-tab--active::before {
    opacity: 0 !important
}
.theme--light.v-tabs .v-tab:hover::before {
    opactiy: 0 !important
}
</style>