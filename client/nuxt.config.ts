export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/google-fonts',
    'nuxt-marquee',
    '@nuxt/icon',
    'nuxt-aos'
  ],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },

  googleFonts: {
    families: {
      Poppins: 500
    }
  },

  runtimeConfig: {
    BASE_URL: process.env.BASE_URL
  },

  compatibilityDate: '2024-09-17'
})