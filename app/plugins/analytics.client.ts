import { inject } from '@vercel/analytics'

// Vercel Web Analytics: cookieless, so no consent banner. Only reports in production on Vercel.
export default defineNuxtPlugin(() => {
  inject({ mode: import.meta.dev ? 'development' : 'production' })
})
