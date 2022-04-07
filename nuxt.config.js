export default {
  // Loading: https://nuxtjs.org/docs/features/loading/
  loading: {
    color: '#00e492',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Lookmenu - %s',
    title: 'Welcome!',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/img/logo.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/main.scss', '@/assets/scss/app.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/validation.client.js',
    '@/plugins/notify.client.js',
    '@/plugins/axios.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    ['nuxt-buefy', { css: false }],
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    prefix: '/api',
    proxy: true,
  },

  // Nuxt Auth + Auth0: https://auth.nuxtjs.org/providers/auth0
  auth: {
    strategies: {
      auth0: {
        domain: 'lookmenu.us.auth0.com',
        clientId: 'WQFx36aqrzNgqui4MFmb8SiUkqKNchaN',
        audience: 'https://lookmenu.app',
        logoutRedirectUri: 'http://localhost:3000',
        scope: ['openid', 'profile', 'email', 'offline_access'],
        responseType: 'code',
        grantType: 'authorization_code',
        codeChallengeMethod: 'S256',
      },
    },
    redirect: {
      login: '/',
      logout: '/',
      callback: '/login',
      home: '/app',
    },
    plugins: ['~/plugins/axios'],
  },

  proxy: {
    '/api': process.env.BASE_URL,
  },

  router: {
    middleware: ['auth'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
  },
}
