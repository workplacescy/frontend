import {resolve} from 'path'
import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue'
// import htmlPurge from 'vite-plugin-html-purgecss'
// import minify from "vite-plugin-minify";
import vuetify from "vite-plugin-vuetify";
import VitePluginRadar from "vite-plugin-radar";

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
      // htmlPurge(['marker-label']),
      // minify({
      //   collapseBooleanAttributes: true,
      //   collapseWhitespace: true,
      //   decodeEntities: true,
      //   noNewlinesBeforeTagClose: true,
      //   removeAttributeQuotes: true,
      //   removeComments: true,
      //   removeEmptyAttributes: true,
      //   removeRedundantAttributes: true,
      //   removeScriptTypeAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   useShortDoctype: true,
      // }),
      VitePluginRadar({
        analytics: {
          id: process.env.VITE_GOOGLE_ANALYTICS_ID,
        },
      }),
      vue(),
      vuetify(),
    ],
  });
}