// Cloudflare Pages Function: server-side proxy for Zoho webhook submissions.
// Keeps Zoho URL and zapikey out of browser requests and avoids CORS failures.

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}

export async function onRequestOptions() {
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

export async function onRequestPost(context) {
  const webhookUrl = context.env.ZOHO_WEBHOOK_URL
  if (!webhookUrl) {
    return jsonResponse(500, { error: 'Server misconfiguration: ZOHO_WEBHOOK_URL missing.' })
  }

  let payload
  try {
    payload = await context.request.json()
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
      headers: {
        'Content-Type': 'application/json',
      },
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
