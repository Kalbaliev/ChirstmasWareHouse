<template>
  <v-container fill-height  >
    <v-layout  align-center justify-center >
      <v-flex xs12 sm6 md4> 
        <v-card  class="amber lighten-4">
          <v-card-title class="headline green lighten-2" primary-title>{{$t('Header.addNewProductTxt')}}</v-card-title>

          <v-card-text>
              <v-form class="px-3" ref="form">
                <v-text-field
                v-model="product.name"
                :rules="nameRules"
                :counter="30"
                :label="$t('Gifts.productNameTxt')"
                required
              ></v-text-field>
                  <v-textarea 

                      no-resize
                      :label="$t('Gifts.productDescriptionTxt')"
                      v-model="product.description"
                      :rules="textAreaRules"
                      :counter="1000"
                      required
                  ></v-textarea>

                     

                    <v-select
                          v-model="product.category"
                          :items="$t('Categories.items')"
                          
                          append-outer-icon="mdi-view-list"
                          :rules="[v => !!v || $t('Gifts.requiredProductCategoryTxt')]"
                          :label="$t('Gifts.productCategoryTxt')"
                          required
                      >
                       
                      </v-select>
                          <v-col cols="12">
                              <v-subheader class="pl-0">{{$t('Gifts.productCountTxt')}}</v-subheader>
                              <v-slider
                                  class="green--text"
                                  :rules="countAndPriceRules"
                                  v-model="product.count"
                                  thumb-color="green lighten-2"
                                  track-fill-color="green lighten-2"
                                  thumb-label="always"
                              ></v-slider>
                          </v-col>
                          <v-text-field
                              class="mb-10"
                              :rules="countAndPriceRules"
                              :label="$t('Gifts.productPriceTxt')"
                              v-model="product.price"
                              hide-details
                              single-line
                              type="number"
                              required
                          />

                          <v-layout  column align-center>
                            <v-flex >
                                <v-btn primary x-large @click="AddProduct"  :disabled="disabledButton" :loading="getLoading"  class="green white--text mt-10 mx-0" >{{$t('Gifts.addProductTxt')}}</v-btn>
                            </v-flex>
                          </v-layout>        
                </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
   </v-container>
</template>

<script>

import moment from "moment"
import axios from "axios";
import {mapGetters} from "vuex"
export default {
    data(){
        return{

            sumbitButton:false,
           

            product:{
                name:'',
                description:'',
                category:null,
                count:null,
                price:null,
                date:moment(new Date()).format("DD.MM.YYYY"),
            },
       
          
            // categories:['Shoes','Clothes','Drinks','Trees','Accessories','Books'],
       

              // categories:[

              //   {text:"Ayaqqabı",value:"Shoes"},
              //   {text:"Paltar",value:"Clothes"},
              //   {text:"İçkin",value:"Drinks"},
              //   {text:"Ağac",value:"Trees"},
              //   {text:"Aksesuarlar",value:"Accessories"}, 
              //   {text:"Kitablar",value:"Books"}
              // ],

            nameRules: [
                v => !!v || this.$t('Gifts.requiredNameTxt'),
                v => v.length <= 30 || this.$t('Gifts.maxLengthNameTxt'),
                v => v.length >= 4 || this.$t('Gifts.minLengthNameTxt')
                ],
            textAreaRules:[

                v => !!v || this.$t('Gifts.requiredDescriptionTxt'),
                v => v.length <= 1000 || this.$t('Gifts.maxLengthDescriptionTxt'),
                v => v.length >= 15 || this.$t('Gifts.minLengthDescriptionTxt')
            ],
            countAndPriceRules:[
                v=>!!v|| this.$t('Gifts.requiredPriceAndCountTxt'),
                v=> v>=1 || this.$t('Gifts.minPriceAndCountTxt')
            ],
          
            
        }
    },

  
    methods:{

      AddProduct(){
        if(this.$refs.form.validate()){

            this.sumbitButton=true;
            let author=localStorage.getItem("displayName")
            this.$store.dispatch("addProductSync",{...this.product,author:author})
        }
      }
    },
    computed:{
      ...mapGetters(['getLoading']),
       disabledButton(){
 
        if(this.product.name.length>=4 &&this.product.description.length>=15 && this.product.count>0 && this.product.price>0 && this.product.category!==null ){
          return false;
        }
        return true;

      }
    },

    beforeRouteLeave(to ,from,next){

      //Formu doldurmamis forumdan cixmaga gadaga )
      if((this.product.name.length>0 || this.product.description.length>0 || this.product.count>0 || this.product.price>0 || this.product.category!==null ) && !this.sumbitButton) {
        if (confirm(this.$t('Gifts.beforeRouteAlertTxt'))) {

          next();
        } else {
          next(false);
        }
      }else{
        next();
      }

    }
  

}
</script>