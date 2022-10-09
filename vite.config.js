import {resolve} from 'path'
import {defineConfig, loadEnv} from 'vite';
import replace from '@rollup/plugin-replace';
import {createHtmlPlugin} from "vite-plugin-html";
import minify from "vite-plugin-minify";
import vue from '@vitejs/plugin-vue'
// import htmlPurge from 'vite-plugin-html-purgecss'
// import minify from "vite-plugin-minify";
import vuetify from "vite-plugin-vuetify";
import VitePluginRadar from "vite-plugin-radar";
import {VitePWA} from "vite-plugin-pwa";

export default mode => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    build: {
      reportCompressedSize: false,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          about: resolve(__dirname, 'about/index.html')
        }
      }
    },
    esbuild: {
      legalComments: "none"
    },
    plugins: [
      replace({
        __SENTRY_DEBUG__: false,
        __SENTRY_TRACING__: false,
        preventAssignment: true,
      }),
      // htmlPurge(['marker-label']),
      createHtmlPlugin({minify: false}),
      minify({
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: false,
        noNewlinesBeforeTagClose: true,
        processConditionalComments: false,
        removeComments: true,
        removeEmptyAttributes: true,
        removeEmptyElements: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      }),
      VitePluginRadar({
        analytics: {
          id: process.env.VITE_GOOGLE_ANALYTICS_ID,
        },
      }),
      vue(),
      vuetify({styles: {configFile: 'src/settings.scss'}}),
      VitePWA({
        injectRegister: 'inline',
        includeAssets: [
          'favicon.ico',
          'apple-touch-icon.png',
        ],
        manifest: {
          "background_color": "#ffffff",
          "display": "standalone",
          "name": "Workplaces in Cyprus",
          "short_name": "Workplaces in Cyprus",
          "start_url": "/?utm_source=homescreen",
          "theme_color": "#ffffff",
          "icons": [
            {
              "src": "icon.svg",
              "type": "image/svg",
              "sizes": "any"
            },
            {
              "src": "icon-192.png",
              "type": "image/png",
              "sizes": "192x192"
            },
            {
              "src": "icon-512.png",
              "type": "image/png",
              "sizes": "512x512"
            },
            {
              "src": "icon-maskable-192.png",
              "type": "image/png",
              "sizes": "192x192",
              "purpose": "maskable"
            },
            {
              "src": "icon-maskable-512.png",
              "type": "image/png",
              "sizes": "512x512",
              "purpose": "maskable"
            }
          ],
        },
        workbox: {
          globPatterns: ['**/*.{css,html,ico,js,json,png,svg}'],
          runtimeCaching: [{
            handler: 'StaleWhileRevalidate',
            urlPattern: /\.(?:cur|jpg|jpeg|json|png|svg)$/
          }],
        },
      })
    ],
  });
}
