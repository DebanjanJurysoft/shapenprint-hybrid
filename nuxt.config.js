export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    script: [
      {
        src: 'https://checkout.razorpay.com/v1/checkout.js',
        defer: true,
      },
    ],
    title: 'ShapeNPrint',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/images/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    './static/css/work.css',
    './static/css/bootstrap.min.css',
    // './static/css/owl.carousel.min.css',
    './static/css/font-awesome.min.css',
    // './static/css/flaticon.css',
    // './static/css/jquery-ui.css',
    // './static/css/metisMenu.min.css',
    // './static/css/slicknav.min.css',
    // './static/css/swiper.min.css',
    './static/css/styles.css',
    './static/css/responsive.css',
    // 'https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.min.css',
    // 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  ],


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/googleMap.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/dotenv'
  ],
  router: {
    middleware: 'redirect'
  },
  env: {
    razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    shippingBaseURL: process.env.SHIPPING_BASE_URL,
    googleMapApiKey: process.env.GOOGLE_MAP_KEY,
  },
  toast: {
    position: 'top-right',
    duration: 2000,
    keepOnHover: true,
    theme: 'bubble'
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://jurysoftprojects.com/shapeNprint_api/api',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
