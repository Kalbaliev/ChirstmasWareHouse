<template>


    <v-container  class="mx-10 px-10">
      
              <v-layout class="mt-10" flex align-center justify-center>
                 <v-btn @click="selectedCategory=category.value" v-for="category in $t('Categories.lists')" class="mx-1 green darken-1"> 
                     
                     
                     <i :class="['white--text fas',category.icon,'fa-lg']"></i>

                                <span class="white--text"> &nbsp {{category.name}}</span>
           
                      </v-btn>
              </v-layout>



                      <transition-group v-if="productsGetter.length>0"  name="fade"  tag="v-layout" mode="out-in"
                         class="manual-v-layout">
                        <v-flex  xs12 sm6 md2  :key="index" v-for="(gift,index) in productsGetter"  class="mx-7 mb-1"   >
                        
                                <v-card
                                    :to="'/gifts/'+gift.id"
                                    elevation="10"
                                    color="green lighten-3"
                                    class="mx-auto my-6"
                                    max-width="285"
                                    
                                    >
                               
                                        <v-img 
                                       
                                       width="285"
                                       height="190"
                                        :src="'./src/assets/images/resized/'+gift.category+'-sm.jpg'">
                                               
                                                <v-row align="end" justify="end" class="lightbox white--text  fill-height">
                                                  
                                                       
                                                  
                                                          <v-col cols="6">
                                                            <div class="title red px-1 text-center">{{gift.price |currency}}</div>
                                                        </v-col>
                                                </v-row>
                                               
                                        </v-img>
                              

                                        <v-card-title>{{gift.name}}</v-card-title>
                                    
                                        <v-card-text >
                                         
                                    
                                            <!-- <div>{{gift.description.split(" ").splice(0,20).join(" ") + '...' }}</div> -->
                                            <div>{{gift.description.substring(0,80) + '...' }}</div>
                                        </v-card-text>
                                    
                                        <v-divider class="mx-4"></v-divider>
                                    
                                        <v-row class="pl-4">
                                            <v-col>
                                                <span>{{$t('Gifts.stockTxt')}} :{{gift.count}}</span>
                                                
                                            </v-col>
                                            <v-col class="pl-0" >
                                            
                                                <span > <i class="fa fa-user-o"></i> {{gift.author}}</span>
                                            </v-col>
                                        </v-row>
                                        
                                    
                                        <v-card-actions >
                                                <v-row   class="lightbox white--text  fill-height">
                                                    <v-col cols="12">
                                                        <div class="title blue-grey darken-2  px-1 text-center">{{gift.date}}</div>
                                                    </v-col>
                                                </v-row>
                                                <v-spacer></v-spacer>
                                            <v-btn
                                            justify-end
                                            color="orange  white--text"
                                            large
                                            :to="'/gifts/'+gift.id"
                                            >
                                            {{$t('Gifts.moreTxt')}}
                                            </v-btn>
                                        </v-card-actions>
                                
                            </v-card>
                  
                        </v-flex>
                     
                       
                      
                       </transition-group> 
                      
                                <v-row v-else>

                                    <v-col cols="8" offset="2" class="mt-10">
                                        <v-alert
                                            prominent
                                            type="warning"
                                        >
                                            <v-row align="center">
                                            <v-col class="grow">{{$t('Gifts.notProductMsgTxt')}}</v-col>
                                            <v-col class="shrink">
                                                        <v-btn   color="purple "  router :to="'/gifts/addgift'">
                                                            <span>{{$t('Header.addNewProductTxt')}}</span>
                                                        </v-btn>
                                            </v-col>
                                            </v-row>
                                        </v-alert>
                                    </v-col>
                                </v-row>
                           

    
    </v-container>
    
     
</template>

<script>
import {mapGetters} from "vuex"
export default {
    data(){
        return{
            products:{},
         
            
            selectedCategory:'all',
            
        }
    },
    computed:{
        ...mapGetters(["getProducts"]),
        productsGetter(){

           this.products=this.$store.getters.getProducts(this.selectedCategory);
           
           return this.products
        }
    },
    
}
</script>

<style scoped>
  .fade-enter{
    
    opacity:0;
  }
  .fade-enter-active{
    transition: opacity 1s ease-out;
  }
  .fade-leave{}
  .fade-leave-active{
    transition: opacity .3s ease-out;
    opacity:0;
    position: absolute;
  }
  .fade-move {
      transition:transform .3s;
  }

   .manual-v-layout {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    padding-bottom: 8px!important;
    padding-top: 8px!important;
  }
</style>