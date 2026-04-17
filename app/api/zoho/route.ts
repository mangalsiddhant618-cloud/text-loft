const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID
const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET
const ZOHO_REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN
const ZOHO_OAUTH_DOMAIN = process.env.ZOHO_OAUTH_DOMAIN ?? 'https://accounts.zoho.com'
const ZOHO_API_DOMAIN = process.env.ZOHO_API_DOMAIN ?? 'https://www.zohoapis.com'

async function getAccessToken() {
  if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN) {
    throw new Error('Zoho credentials are required in environment variables.')
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

async function createZohoLead(accessToken: string, formData: {
  name: string
  email: string
  phone: string
  preferredTime: string
}) {
  const leadPayload = {
    data: [
      {
        Company: 'Website Lead',
        Last_Name: formData.name || 'Unknown',
        Email: formData.email,
        Phone: formData.phone,
        Description: `Preferred contact time: ${formData.preferredTime}`,
        Lead_Source: 'Website Inquiry',
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
    throw new Error(`Zoho lead creation failed: ${response.status} ${body}`)
  }

  return await response.json()
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, preferredTime } = body

    if (!name || !email || !phone) {
      return new Response(JSON.stringify({ error: 'Missing required fields.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

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
