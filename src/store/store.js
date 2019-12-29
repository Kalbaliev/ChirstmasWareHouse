import Vue from "vue";
import Vuex from "vuex";
import product from "./modules/product"
import common from "./modules/common"
import auth from "./modules/auth"
import langs from "./modules/langs"

Vue.use(Vuex)

export const store = new Vuex.Store({

    state:{

    },
    modules:{
        product,
        auth,
        common,
        langs
    }


})