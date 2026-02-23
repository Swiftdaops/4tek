import { NextResponse } from 'next/server'

const ALLOWED_HOSTS = ['res.cloudinary.com']

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    if (!url) return NextResponse.json({ error: 'missing url' }, { status: 400 })

    const parsed = new URL(url)
    if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
      return NextResponse.json({ error: 'domain not allowed' }, { status: 403 })
    }

    const downstream = await fetch(url, { method: 'GET', headers: { accept: '*/*' } })
    if (!downstream.ok) return new Response(null, { status: downstream.status })

    // Stream the response back to the client, but strip any Set-Cookie headers
    const headers = new Headers()
    const contentType = downstream.headers.get('content-type') || 'application/octet-stream'
    headers.set('Content-Type', contentType)
    // long cache for immutable assets
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')

    return new Response(downstream.body, { status: 200, headers })
  } catch (err) {
    return NextResponse.json({ error: 'proxy error' }, { status: 500 })
  }
}
