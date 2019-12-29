import Vue from "vue"
import VueI18n from "vue-i18n"

import en from "./../langs/en.json"
import az from "./../langs/az.json"

Vue.use(VueI18n)


export const i18n =new VueI18n({

    locale:'en',
    fallbackLocale:'az',

    messages: {
        en,
        az
    }


})