<template>
    

    <v-container class="pt-0" fill-height>
        <v-row >
            <v-col offset="1" cols="2"  style="flex:0 0 10%">
           
                    <v-row class="mb-5">

                     <v-hover
                            v-slot:default="{ hover }"
                           
                        >
                                            <v-card
                                             :elevation="hover ? 20 : 2"

                                                color="tranparent"
                                            style="cursor:pointer"
                                            max-height="150"
                                            max-width="150"
                                            >


                                            
                                                <v-img
                                               
                                                height="150"
                                                width="150"
                                                    @click="changeImage(product.category)"
                                                    :src="'./../src/assets/images/resized/'+product.category+'-sm.jpg'"
                                                    lazy-src
                                            >
                                                
                                                </v-img>

                                                </v-card>

                     </v-hover>
                        </v-row> 
                
                      <v-row class="mt-6">

          
                               <v-hover
                            v-slot:default="{ hover }"
                           
                        >
                                            <v-card
                                             :elevation="hover ? 20 : 2"
                                                style="cursor:pointer"
                                              color="tranparent"  
                                max-height="150"
                                max-width="150"
                                >


                                
                                    <v-img
                                    
                                    height="150"
                                    width="170"
                                        @click="changeImage(product.category+'2')"
                                        :src="'./../src/assets/images/resized/'+product.category+'-sm2.jpg'"
                                        lazy-src
                                >
                                    
                                    </v-img>

                                    </v-card>
                               </v-hover>
                     </v-row>
                     <v-row class="mt-6" >

                    <v-hover
                            v-slot:default="{ hover }"
                           
                     >
                            <v-card
                                :elevation="hover ? 20 : 2"
                                style="cursor:pointer"
                                color="tranparent"
                                max-height="150"
                                max-width="150"
                                >


                                
                                    <v-img
                                    
                                    height="150"
                                    width="150"
                                              @click="changeImage(product.category+'3')"
                                        :src="'./../src/assets/images/resized/'+product.category+'-sm3.jpg'"
                                        lazy-src
                                >
                                    
                                    </v-img>

                                    </v-card>
            </v-hover>
                     </v-row>

            </v-col>

            <v-col cols="4"
                   
                > 
                <v-layout flex justify-center align-center>
                    <v-flex>
                        <v-card
                        
                        elevation="20"

                        max-height="500"
                        max-width="500"
                        >


                        
                            <v-img
                            
                            height="500"
                            width="500"
                                :src="selectedImage!==null ?'./../src/assets/images/medium/'+selectedImage+'.jpg' : './../src/assets/images/medium/'+product.category+'.jpg'"
                            >
                            
                            </v-img>

                            </v-card>
                    </v-flex>
                </v-layout>
            </v-col>

            <v-col cols="5"
                   > 
                <v-layout flex justify-center align-center>
                    <v-flex>
                    


                        

                    <v-row >
                        <v-col cols="10">
                            <h2 class="mx-10  white--text display-1">{{product.name}}</h2>
                              <h1 class="mx-10 black--text display-2">{{product.price | currency}}  </h1>

                            <h4 class="mx-10 mt-2  purple--text"> <v-icon class="purple--text headline ">mdi-wallet-giftcard</v-icon> {{$t('Gifts.stockTxt')}}: {{product.count}}</h4>
                          
                                <p class="mx-10 mt-4"> {{product.description}}</p>
                                <v-btn x-large class="ml-10 mt-5" >{{$t('Gifts.buyNowTxt')}} &nbsp <v-icon color="orange">mdi-shopping</v-icon></v-btn>
                                <v-btn class="mx-5 mt-5" outlined >{{$t('Gifts.sellerTxt')}}:{{product.author}} &nbsp  <v-icon color="purple " style="vertical-align:baseline ">mdi-account</v-icon></v-btn> 
                               
                        </v-col>
                    </v-row>
                        
                            

                           
                    </v-flex>
                </v-layout>
            </v-col>
        </v-row>
    </v-container>


</template>

<script>
export default {
    
    data(){

        return {

                productSelected:{},
                selectedImage:null
        }
    },
    computed:{  
 
       product(){
    
            this.productSelected=this.$store.getters.getProduct(this.$route.params.id)[0];
            return this.productSelected;
    
  

      },
      
    },
  
        methods:{
            changeImage(image){

               this.selectedImage=image
         
            }
        }
   

    

   

}
</script>