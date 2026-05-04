import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'v41axjo7',
  dataset: 'production',
  apiVersion: '2026-03-08',
  useCdn: false,
});

const nBase = await client.fetch('count(*[_type == "baseRateEntry"])');
const nBranch = await client.fetch('count(*[_type == "branch"])');
console.log('baseRateEntry documents:', nBase);
console.log('branch documents:', nBranch);
