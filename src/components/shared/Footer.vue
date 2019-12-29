 </<template>

  <v-footer
      color="green"
      padless
      fixed
    >
      <v-row
     
        justify="center"
       
      >
      
        
        <v-col
          class="purple darken-2 py-2 text-center white--text"
          cols="12"
        >
         <v-row justify="center"> 
                <v-btn
                
                    v-for="icon in icons"
                    :key="icon"
                    class="my-2 mx-4 white--text"
                    icon
                    >
                    <v-icon size="24px">{{ icon }}</v-icon>
                </v-btn>
          </v-row>
          <v-row justify="center"> 
                {{ new Date().getFullYear() }} — <span class="red--text text--lighten-1  font-weight-bold">&nbsp Chirstmas</span> 
                <span class="font-weight-light">WareHouse &nbsp</span> 
                    
                    <i class="fas fa-gift fa-lg  amber--text" ></i> 
        </v-row>
        </v-col>
      </v-row>
    </v-footer>


     
 </template>
 
<script>
export default {
    
    data(){

        return{

             icons: [
                    'fab fa-facebook',
                    'fab fa-twitter',
                   
                    'fab fa-linkedin',
                    'fab fa-instagram',
                    ],
        }
    }
}
</script>