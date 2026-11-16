import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/test-utils/module',
    '@nuxt/icon/module',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt/module',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'theme-color', content: '#f2f2f0', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#0e0e0e', media: '(prefers-color-scheme: dark)' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      // Canonical origin for absolute URLs in link previews. The apex domain redirects to www.
      siteUrl: 'https://www.tevdevelops.com',
    },
  },
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },
  compatibilityDate: '2026-11-01',
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
