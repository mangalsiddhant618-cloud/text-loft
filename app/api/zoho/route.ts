const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID
const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET
const ZOHO_REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN
const ZOHO_ACCESS_TOKEN = process.env.ZOHO_ACCESS_TOKEN
const ZOHO_OAUTH_DOMAIN = process.env.ZOHO_OAUTH_DOMAIN ?? 'https://accounts.zoho.com'
const ZOHO_API_DOMAIN = process.env.ZOHO_API_DOMAIN ?? 'https://www.zohoapis.com'
const ZOHO_LEAD_SOURCE = process.env.ZOHO_LEAD_SOURCE ?? 'Website Inquiry'
const ZOHO_LEAD_COMPANY = process.env.ZOHO_LEAD_COMPANY ?? 'Website Lead'

export const runtime = 'nodejs'

type ZohoFormData = {
  name: string
  email: string
  phone: string
  preferredTime?: string
}

async function getAccessToken() {
  if (ZOHO_ACCESS_TOKEN) {
    return ZOHO_ACCESS_TOKEN
  }

  if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN) {
    throw new Error(
      'Zoho credentials are required in environment variables. Provide ZOHO_ACCESS_TOKEN, or ZOHO_CLIENT_ID + ZOHO_CLIENT_SECRET + ZOHO_REFRESH_TOKEN.'
    )
  }

  const tokenUrl = `${ZOHO_OAUTH_DOMAIN}/oauth/v2/token?refresh_token=${encodeURIComponent(
    ZOHO_REFRESH_TOKEN
  )}&client_id=${encodeURIComponent(ZOHO_CLIENT_ID)}&client_secret=${encodeURIComponent(
    ZOHO_CLIENT_SECRET
  )}&grant_type=refresh_token`

  const response = await fetch(tokenUrl, {
    method: 'POST',
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Zoho token refresh failed: ${response.status} ${body}`)
  }

  const data = await response.json()
  if (!data.access_token) {
    throw new Error('Zoho token response did not include access_token.')
  }

  return data.access_token as string
}

async function createZohoLead(accessToken: string, formData: ZohoFormData) {
  const leadPayload = {
    data: [
      {
        Company: ZOHO_LEAD_COMPANY,
        Last_Name: formData.name || 'Unknown',
        Email: formData.email,
        Phone: formData.phone,
        Description: `Preferred contact time: ${formData.preferredTime || 'Anytime'}`,
        Lead_Source: ZOHO_LEAD_SOURCE,
      },
    ],
    trigger: ['approval', 'workflow'],
  }

  const response = await fetch(`${ZOHO_API_DOMAIN}/crm/v2/Leads`, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(leadPayload),
  })

  if (!response.ok) {
    const body = await response.text()
    let errorMessage = body
    try {
      const parsed = JSON.parse(body)
      errorMessage = parsed?.message ?? JSON.stringify(parsed)
    } catch {
      // keep raw text
    }
    throw new Error(`Zoho lead creation failed: ${response.status} ${errorMessage}`)
  }

  return await response.json()
}

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed.' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let body: ZohoFormData
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { name, email, phone, preferredTime } = body

  if (!name || !email || !phone) {
    return new Response(JSON.stringify({ error: 'Missing required fields.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const accessToken = await getAccessToken()
    const result = await createZohoLead(accessToken, { name, email, phone, preferredTime })

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Zoho API error:', error)
    return new Response(JSON.stringify({ error: (error as Error).message || 'Zoho integration failed.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
