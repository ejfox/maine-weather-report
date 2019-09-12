var glob = require('glob');
var path = require('path');
// var marked = require('marked')
// import marked from 'marked'
// Build markdown parser
// const markdownRenderer = marked.setOptions({
//   renderer: new marked.Renderer(),
//   pedantic: false,
//   gfm: true,
//   tables: false,
//   breaks: false,
//   sanitize: false,
//   smartLists: false,
//   smartypants: true,
//   xhtml: false
// })

// Enhance Nuxt's generate process by gathering all content files from Netifly CMS
// automatically and match it to the path of your Nuxt routes.
// The Nuxt routes are generate by Nuxt automatically based on the pages folder.
var dynamicRoutes = getDynamicPaths({
  '/words': 'words/posts/*.json'
});

module.exports = {
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/google-analytics'
    // 'nuxt-purgecss'
    // '@nuxtjs/feed'
  ],
  plugins: [
    '~/plugins/vue-moment.js'
  ],
  googleAnalytics: {
    id: 'UA-319549-1'
  },
  axios: {
    // proxyHeaders: false
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Maine Weather Report',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Poetry and writing in the form of meteorogically-inspired reports from the state of Maine' },
      { hid: 'keywords', name: 'keywords', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#6f6f6f' },
  /*
  ** Route config for pre-rendering
  */
  generate: {
    routes: dynamicRoutes
  },

  router: {
    scrollBehavior: async (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      }

      const findEl = async (hash, x) => {
        return document.querySelector(hash) ||
          new Promise((resolve, reject) => {
            if (x > 50) {
              return resolve()
            }
            setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
          })
      }

      if (to.hash) {
        let el = await findEl(to.hash)
        if ('scrollBehavior' in document.documentElement.style) {
          return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
        } else {
          return window.scrollTo(0, el.offsetTop)
        }
      }

      return { x: 0, y: 0 }
    },
    // extendRoutes (routes, resolve) {
    //   routes.push({
    //     name: 'shop',
    //     path: '/shop',
    //     component: resolve(__dirname, 'pages/shop.vue')
    //   })
    //
    //   routes.push({
    //     name: 'vibes',
    //     path: '/vibes',
    //     component: resolve(__dirname, 'pages/vibes.vue')
    //   })
    //
    //   routes.push({
    //     name: 'donate',
    //     path: '/donate',
    //     component: resolve(__dirname, 'pages/donate.vue')
    //   })
    // }
  },
  /*
  ** Build configuration
  */
  build: {
    //analyze: true,
    // /*
    // ** Run ESLint on save
    // */
    extend(config, { isDev, isClient }) {
      // if (isDev && isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
      node: {
        fs: 'empty'
      }
    }
  }
}

/**
 * Create an array of URLs from a list of files
 * @param {*} urlFilepathTable
 */
function getDynamicPaths(urlFilepathTable) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map(url => {
      var filepathGlob = urlFilepathTable[url];
      return glob
        .sync(filepathGlob, { cwd: 'content' })
        .map(filepath => `${url}/${path.basename(filepath, '.json')}`);
    })
  );
}
