<template>



        <v-container class="mx-10 mt-10">
               
                    <v-row justify="center" align="center">
                                <v-col>
                                    
                                    <v-row class="mb-4"  justify="center" align="center">
                                        <h1 style="" class="text-center ">
                                    
                                         
                                            {{$t('Home.welcomeTxt')}}
                                            <span class="red--text text--lighten-1  font-weight-bold">Chirstmas</span> 
                                                <span class="font-weight-light">WareHouse-{{$t('Home.welcomeSuffixTxt')}}</span> 
                                        
                                        <i class="fas fa-gift  amber--text"></i>   
                                        </h1>
                                    </v-row>

                                    <v-row  justify="center" align="center">
                                        <v-layout  column align-center>
                                            <v-flex >
                                                <v-img height="200" width="200"   src="./src/assets/images/logo.png" >

                                                </v-img>
                                            </v-flex>
                                        </v-layout>   
                                    </v-row>

                                </v-col>
                                                                    
                        </v-row>
        <v-layout row wrap class="my-10">

   
                <v-flex  xs12 sm6 md3 class="mx-4 mb-4">
                    <v-card
                        color="amber"

                        >
                        <v-card-title class="headline">{{$t('Home.allGiftsCountTxt')}} - {{productsNumb}}</v-card-title>
            
                        <v-card-subtitle>
                            {{$t('Home.allgiftsCountDescriptionTxt')}}
                            </v-card-subtitle>
            
                        <v-card-actions>
                            <v-btn color="purple" :to="'/gifts'" outlined >{{$t('Home.lookAtTxt')}}</v-btn>
                        </v-card-actions>
                        </v-card>
                </v-flex>
          
        
        </v-layout>

        

        </v-container>

      
</template>

<script>
export default {
    
    computed:{
        productsNumb(){

            let productsNumber = this.$store.state.product.products.length
            
            return productsNumber
        }
    },
    created(){
  
        this.$store.dispatch("getProductsSync");
    }
}
</script>


