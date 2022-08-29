import "./components/Sentry.js";
// import Analytics from "./src/Analytics";

import {createApp} from 'vue'
import {createVuetify} from "vuetify";
import {mdi} from 'vuetify/iconsets/mdi-svg'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import App from './App.vue'

import 'vuetify/styles'
import './main.scss'

createApp(App)
    .use(createVuetify({
      icons: {
        sets: {
          mdi
        }
      },
      theme: {
        themes: {
          light: {
            colors: {
              primary: '#d57800',
              secondary: '#4e5b31'
            },
          },
        },
      },
    }))
    .use(VueGoogleMaps, {
      load: {
        key: import.meta.env.VITE_MAP_API_KEY,
      },
    })
    .mount('#app')
