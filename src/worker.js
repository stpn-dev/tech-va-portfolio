// Cloudflare Worker: routes /api/contact to Zoho proxy, serves everything
// else from static assets (built React SPA in dist/).

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}

function handleOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'no-store',
    },
  })
}

async function handleContact(request, env) {
  const webhookUrl = env.ZOHO_WEBHOOK_URL
  if (!webhookUrl) {
    return jsonResponse(500, { error: 'Server misconfiguration: ZOHO_WEBHOOK_URL missing.' })
  }

  let payload
  try {
    payload = await request.json()
  } catch {
    return jsonResponse(400, { error: 'Invalid JSON payload.' })
  }

  const required = ['name', 'email', 'subject', 'message']
  const missing = required.filter((key) => !String(payload[key] || '').trim())
  if (missing.length > 0) {
    return jsonResponse(400, { error: `Missing required fields: ${missing.join(', ')}` })
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!upstream.ok) {
      return jsonResponse(502, { error: `Zoho upstream error: ${upstream.status}` })
    }

    return jsonResponse(200, { ok: true })
  } catch {
    return jsonResponse(502, { error: 'Unable to reach Zoho endpoint.' })
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/api/contact') {
      if (request.method === 'OPTIONS') return handleOptions()
      if (request.method === 'POST') return handleContact(request, env)
      return new Response('Method not allowed', { status: 405 })
    }

    // All other requests served from static assets (dist/)
    return env.ASSETS.fetch(request)
  },
}
