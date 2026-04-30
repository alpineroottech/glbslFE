import { createClient } from '@sanity/client';
const c = createClient({ projectId: 'v41axjo7', dataset: 'production', apiVersion: '2026-03-08', useCdn: false });
const r = await c.fetch('*[_type == "person" && personType == "managementTeam"] | order(order asc) {name, position, "sortOrder": order}');
console.log(JSON.stringify(r, null, 2));
