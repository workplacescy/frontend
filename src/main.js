// import Analytics from "./src/Analytics";

import {createApp} from 'vue'
import {createHead} from "@vueuse/head"
import {createVuetify} from "vuetify";
import {mdi} from 'vuetify/iconsets/mdi-svg'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import * as Sentry from "@sentry/vue";
import {BrowserTracing} from "@sentry/tracing";
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import './main.scss'

const app = createApp(App);

Sentry.init({
  app,
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [new BrowserTracing({
    routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    tracingOrigins: ["localhost", import.meta.env.VITE_APP_URL, /^\//],
  })],
  logErrors: true,
});

app
    .use(router)
    .use(createHead())
    .use(createVuetify({
      display: {
        mobileBreakpoint: 'sm'
      },
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
            variables: {
              'high-emphasis-opacity': 1,
              'medium-emphasis-opacity': 1,
            }
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
