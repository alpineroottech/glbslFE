import {createClient} from '@sanity/client'

// Read-only client (for frontend / queries)
export const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'v41axjo7',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2026-03-08',
  useCdn: true,
})

// Write client (for migration scripts — uses API token)
export const writeClient = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'v41axjo7',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2026-03-08',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})
