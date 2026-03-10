import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const webhookUrl = env.ZOHO_WEBHOOK_URL || env.VITE_ZOHO_WEBHOOK_URL

  let proxy
  if (webhookUrl) {
    const parsed = new URL(webhookUrl)
    const targetOrigin = `${parsed.protocol}//${parsed.host}`
    const targetPath = `${parsed.pathname}${parsed.search}`

    proxy = {
      '/api/contact': {
        target: targetOrigin,
        changeOrigin: true,
        secure: true,
        rewrite: () => targetPath,
      },
    }
  }

  return {
    plugins: [react()],
    base: '/',
    server: proxy ? { proxy } : undefined,
  }
})
