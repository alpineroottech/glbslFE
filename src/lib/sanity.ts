import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = (import.meta as any).env?.VITE_SANITY_PROJECT_ID || 'v41axjo7';
const dataset = (import.meta as any).env?.VITE_SANITY_DATASET || 'production';

if (!(import.meta as any).env?.VITE_SANITY_PROJECT_ID) {
  console.warn('[Sanity] VITE_SANITY_PROJECT_ID is not set — using hardcoded fallback. Set this in your .env file.');
}
if (!(import.meta as any).env?.VITE_SANITY_DATASET) {
  console.warn('[Sanity] VITE_SANITY_DATASET is not set — defaulting to "production".');
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-03-08',
  useCdn: true, // CDN enabled for better performance (1-5 min cache delay for new content)
});

const builder = imageUrlBuilder(client);

/**
 * Generate an image URL from a Sanity image object.
 * Returns empty string for falsy input so callers can safely use it in <img src>.
 */
export const urlFor = (source: any) => {
  if (!source) return { url: () => '' };
  return builder.image(source);
};

/**
 * Generic fetch helper that wraps client.fetch with proper typing.
 */
export async function sanityFetch<T>(query: string, params?: Record<string, any>): Promise<T> {
  return client.fetch<T>(query, params);
}
