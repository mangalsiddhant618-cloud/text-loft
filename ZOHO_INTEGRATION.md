# Zoho CRM Integration Guide

This project includes a Zoho CRM form submission integration using a Next.js API route at `/api/zoho` and the frontend `InterestForm` component.

## What is implemented

- `components/InterestForm.tsx` sends form data to the Zoho endpoint.
- `app/api/zoho/route.ts` receives the data, obtains a Zoho access token, then creates a Zoho CRM Lead.
- The route supports:
  - `ZOHO_ACCESS_TOKEN` (direct access token)
  - or `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, and `ZOHO_REFRESH_TOKEN` (refresh token flow)
- Optional overrides:
  - `ZOHO_OAUTH_DOMAIN` for Zoho regional OAuth endpoints
  - `ZOHO_API_DOMAIN` for Zoho API domain
  - `ZOHO_LEAD_SOURCE` for lead source text
  - `ZOHO_LEAD_COMPANY` for company text in the lead

## Required environment variables

Use one of the following approaches:

### Option A: Refresh token flow (recommended)

- `ZOHO_CLIENT_ID`
- `ZOHO_CLIENT_SECRET`
- `ZOHO_REFRESH_TOKEN`

### Option B: Direct access token

- `ZOHO_ACCESS_TOKEN`

### Optional environment variables

- `ZOHO_OAUTH_DOMAIN` (default: `https://accounts.zoho.com`)
- `ZOHO_API_DOMAIN` (default: `https://www.zohoapis.com`)
- `ZOHO_LEAD_SOURCE` (default: `Website Inquiry`)
- `ZOHO_LEAD_COMPANY` (default: `Website Lead`)
- `NEXT_PUBLIC_ZOHO_API_URL` (optional frontend override)

## Sample `.env.local`

```env
ZOHO_CLIENT_ID=your_zoho_client_id
ZOHO_CLIENT_SECRET=your_zoho_client_secret
ZOHO_REFRESH_TOKEN=your_zoho_refresh_token
# Optional if you want to use the same token directly
# ZOHO_ACCESS_TOKEN=your_zoho_access_token

# Optional region override
# ZOHO_OAUTH_DOMAIN=https://accounts.zoho.eu
# ZOHO_API_DOMAIN=https://www.zohoapis.eu

# If your backend is deployed separately, set this to the full API URL:
# NEXT_PUBLIC_ZOHO_API_URL=https://your-backend.example.com/api/zoho
```

## How to get Zoho refresh token

1. Register your application in Zoho Developer Console.
2. Set the redirect URI for your app to an endpoint you control.
3. Request an authorization code with the correct scopes, for example:
   - `ZohoCRM.modules.leads.CREATE`
4. Exchange the authorization code for a refresh token using Zoho's OAuth token endpoint.
5. Save the refresh token securely in your deployment environment.

## Local test steps

1. Install dependencies:
   - `npm install`
2. Start development server:
   - `npm run dev`
3. Add required env vars to `.env.local`.
4. Open the app and submit the interest form.
5. Confirm the API request goes to `/api/zoho` and returns `success: true`.

## Deploying backend separately

If you want to run the Zoho backend on a separate server:

1. Deploy the same `app/api/zoho/route.ts` backend route to your server.
2. Set the same environment variables on that server.
3. In the frontend deployment, set `NEXT_PUBLIC_ZOHO_API_URL` to the backend route URL.
4. Confirm the frontend uses the deployed backend endpoint.

## Troubleshooting

- `Zoho credentials are required`: missing env vars.
- `Invalid JSON body`: the request body is not valid JSON.
- `Missing required fields`: name, email, or phone is empty.
- `Zoho token refresh failed`: refresh token or client credentials are invalid.
- `Zoho lead creation failed`: check Zoho API permissions and CRM settings.

## Notes

- Keep all Zoho credentials out of source control.
- Use the refresh token flow for longer-lived integration.
- If you want to extend the form, add additional fields in `components/InterestForm.tsx` and include them in `route.ts`.
