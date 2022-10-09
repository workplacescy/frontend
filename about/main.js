import * as Sentry from "@sentry/browser";
import {BrowserTracing} from "@sentry/tracing";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [new BrowserTracing()],
});

// import Analytics from "./src/Analytics";

import 'vuetify/styles'
import '/src/main.scss'
